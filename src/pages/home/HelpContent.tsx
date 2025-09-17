import type { FC } from 'react';

import { Box, Link, Typography } from '@mui/material';

export const HelpContent: FC = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h4">
        About
      </Typography>
      <Typography>
        This is a tool for visualizing word vectors. The pre-trained word vectors being used are from <Link href={"https://nlp.stanford.edu/projects/glove/"} target="_blank" rel="noreferrer">GloVe</Link>, trained using the 2024 Dolma (220B tokens, 1.2M vocab, uncased, 300d vectors) dataset.
      </Typography>
      <Typography>
        To plot a vector, each coordinate is obtained by projecting the vector against each of the axis vectors. Each coordinate is scaled down by the magnitude of its corresponding axis vector.
      </Typography>
      <Typography>
        Valid inputs are either single words, or differences between exactly two words in the format: wordA - wordB. The words must be exactly separated by the character sequence ' - ' (a single hyphen-minus with a single space on each side).
      </Typography>
      <Link href="https://github.com/djiang9001/word_vector_visualizer" target="_blank" rel="noreferrer">Github</Link>
    </Box>
  );
}
