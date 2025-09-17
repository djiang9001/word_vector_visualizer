import type { Vector } from '@app/pages/home/VectorPlot';
import type { WordVector } from '@app/pages/home/UserInputs';

export function dotProduct(a: number[], b: number[]): number {
  if (a.length != b.length) {
    return 0;
  }
  var result = 0;
  for (var i = 0; i < a.length; i++) {
    result += a[i] * b[i];
  }
  return result;
}

export function magnitude(a: number[]): number {
  return Math.sqrt(dotProduct(a, a));
}

export function getUnitVector(a: number[]): number[] {
  const mag = magnitude(a);
  return a.map((x) => x / mag);
}

// Gets the magnitude of the vector projection of a on b
export function getProjectionMagnitude(a: number[], b: number[]): number {
  return dotProduct(a, getUnitVector(b));
}

export function getPlotVectorsFromWordVectors(wordVectorX: WordVector, wordVectorY: WordVector, wordVectorZ: WordVector, userWordVectors: Map<string, WordVector>): Vector[] {
  return Array.from(userWordVectors, ([_key, wordVector]) => {
    return {
      x: (wordVector && wordVectorX) ? getProjectionMagnitude(wordVector?.vector, wordVectorX?.vector) / magnitude(wordVectorX?.vector) : 0,
      y: (wordVector && wordVectorY) ? getProjectionMagnitude(wordVector?.vector, wordVectorY?.vector) / magnitude(wordVectorY?.vector) : 0,
      z: (wordVector && wordVectorZ) ? getProjectionMagnitude(wordVector?.vector, wordVectorZ?.vector) / magnitude(wordVectorZ?.vector) : 0,
      label: wordVector?.label ?? "",
    }
  });
}

export async function getWordVectorQuery(word: string): Promise<number[]> {
  // Replace all forward slashes with spaces
  word = word.replace(/\//g, " ");
  // Append .txt
  word += ".txt"
  var filename = word
  // Add forward slashes every 255 characters
  const byteArray = new TextEncoder().encode(word);
  if (byteArray.length > 255) {
    var decoder = new TextDecoder();
    var numSlashes = Math.floor((byteArray.length - 1) / 255);
    filename = "";
    for (var i = 0; i < numSlashes; i++) {
      filename += decoder.decode(byteArray.slice(i*255, (i+1)*255)) + "/";
      console.log(filename);
    }
    filename += decoder.decode(byteArray.slice(numSlashes*255));
  }
  // Make the query
  const url = "https://raw.githubusercontent.com/djiang9001/word_vectors/refs/heads/main/data/" + filename;
  return fetch(url, { cache: "force-cache" }).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP response status: ${response.status}`);
    }
    return response.text().then((data) => {
      console.log(data);
      return getVectorFromQueryResult(data);
    }).catch((err) => {
      console.error(err);
      return [];
    });
  }).catch((err) => {
    console.error(err);
    return [];
  });
}

export function getVectorFromQueryResult(result: string): number[] {
  const array = result.split(" ");
  if (array.length <= 1) {
    return [];
  }
  return array.slice(1).map((stringFloat: string) => parseFloat(stringFloat));
}

export const getVectorFromWord = async (newWord: string) => {
  const words = newWord.split(" - ");
  if (words.length > 2) {
    console.log(`Vector difference only supports 2 arguments "${newWord}"`);
    alert(`Vector difference only supports 2 arguments "${newWord}"`);
    return [];
  }

  if (words.length == 2) {
    const newWordVector1 = await getWordVectorQuery(words[0]);
    const newWordVector2 = await getWordVectorQuery(words[1]);
    const newWordVector = newWordVector1.map((value, i) => value - newWordVector2[i]);
    return newWordVector;
  }

  const newWordVector = await getWordVectorQuery(newWord);
  if (newWordVector.length == 0) {
    console.log(`Could not find word vector for word "${newWord}"`);
    alert(`Could not find word vector for word "${newWord}"`);
    return [];
  }

  return newWordVector;
};
