import { useRef } from 'react';
import type { FC } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, Line, OrthographicCamera, PerspectiveCamera, OrbitControls, View } from '@react-three/drei';
import { Box, Button } from '@mui/material';
import { useColorScheme, useTheme } from '@mui/material/styles';
import { Layers, Vector3 } from 'three';
import * as THREE from 'three';

export type Vector = {
  x: number;
  y: number;
  z: number;
  label: string;
}

type VectorPlotProps = {
  labelX?: string;
  labelY?: string;
  labelZ?: string;
  vectors?: Vector[];
};

const LayerEnum = {
  DEFAULT: 0,
  AXIS_X: 1,
  AXIS_Y: 2,
  AXIS_Z: 3,
  GRID_XZ: 4,
  GRID_YZ: 5,
  GRID_XY: 6,
  GRID_MAIN: 7,
}

export const VectorPlot: FC<VectorPlotProps> = ({
  labelX = "x",
  labelY = "y",
  labelZ = "z",
  vectors = [],
}) => {

  const { mode, systemMode } = useColorScheme();
  const theme = useTheme();
  var actualMode = mode;
  if (mode === "system") {
    actualMode = systemMode;
  }
  const backgroundColor = actualMode === "light" ? '#d0d0d0' : '#404040';

  const mainOrbitControlRef = useRef<any>(null);
  const xyOrbitControlRef = useRef<any>(null);
  const xzOrbitControlRef = useRef<any>(null);
  const yzOrbitControlRef = useRef<any>(null);
  const ref = useRef<any>(null);

  const mainLayers = new Layers();
  mainLayers.enableAll();
  mainLayers.disable(LayerEnum.GRID_YZ);
  mainLayers.disable(LayerEnum.GRID_XY);
  mainLayers.disable(LayerEnum.GRID_XZ);
  const xyLayer = new Layers();
  xyLayer.disableAll();
  xyLayer.enable(LayerEnum.AXIS_X);
  xyLayer.enable(LayerEnum.AXIS_Y);
  xyLayer.enable(LayerEnum.GRID_XY);
  xyLayer.enable(LayerEnum.DEFAULT);
  const xzLayer = new Layers();
  xzLayer.disableAll();
  xzLayer.enable(LayerEnum.AXIS_X);
  xzLayer.enable(LayerEnum.AXIS_Z);
  xzLayer.enable(LayerEnum.GRID_XZ);
  xzLayer.enable(LayerEnum.DEFAULT);
  const yzLayer = new Layers();
  yzLayer.disableAll();
  yzLayer.enable(LayerEnum.AXIS_Y);
  yzLayer.enable(LayerEnum.AXIS_Z);
  yzLayer.enable(LayerEnum.GRID_YZ);
  yzLayer.enable(LayerEnum.DEFAULT);


  return (
    <Box ref={ref} sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <View index={1} style={{ overflow: "hidden", position: "relative", height: "100%", width: "100%", zIndex: 1 }}>
        <color attach="background" args={[backgroundColor]} />
        <PerspectiveCamera makeDefault position={[2, 2, 2]} fov={40} layers={mainLayers}/>
        <OrbitControls ref={mainOrbitControlRef} enableDamping={false}/>
        <Scene labelX={labelX} labelY={labelY} labelZ={labelZ} vectors={vectors}/>
      </View>
      <Button sx={{ position: "absolute", zIndex: 3 }} onClick={() => mainOrbitControlRef.current.reset()}>
        Reset
      </Button>
      <Box style={{ display: "flex", height: "100%", width: "100%" }}>
        <Box style={{ display: "flex", height: "100%", width: "100%", borderRight: `4px solid ${theme.palette.primary.main}`, zIndex: 2 }}>
          <View index={1} style={{ overflow: "hidden", position: "relative", height: "100%", width: "100%" }}>
            <color attach="background" args={[backgroundColor]} />
            <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={100} args={[-100, 100, 100, -100, -100, 100]} layers={xyLayer}/>
            <Scene labelX={labelX} labelY={labelY} vectors={vectors}/>
            <OrbitControls ref={xyOrbitControlRef} enableRotate={false} enableDamping={false}
              mouseButtons={{
                LEFT: THREE.MOUSE.PAN,
                MIDDLE: THREE.MOUSE.DOLLY,
                RIGHT: THREE.MOUSE.ROTATE,
              }}
            />
          </View>
          <Button sx={{ position: "absolute", zIndex: 3 }} onClick={() => xyOrbitControlRef.current.reset()}>
            Reset
          </Button>
        </Box>
        <Box style={{ display: "flex", height: "100%", width: "100%", borderRight: `4px solid ${theme.palette.primary.main}`, zIndex: 2 }}>
          <View index={1} style={{ overflow: "hidden", position: "relative", height: "100%", width: "100%" }}>
            <color attach="background" args={[backgroundColor]} />
            <OrthographicCamera makeDefault position={[0, -10, 0]} rotation={[Math.PI / 2, 0, 0]} zoom={100} args={[-100, 100, 100, -100, -100, 100]} layers={xzLayer}/>
            <Scene labelX={labelX} labelZ={labelZ} vectors={vectors}/>
            <OrbitControls ref={xzOrbitControlRef} enableRotate={false} enableDamping={false}
              mouseButtons={{
                LEFT: THREE.MOUSE.PAN,
                MIDDLE: THREE.MOUSE.DOLLY,
                RIGHT: THREE.MOUSE.ROTATE,
              }}
            />
          </View>
          <Button sx={{ position: "absolute", zIndex: 3 }} onClick={() => xzOrbitControlRef.current.reset()}>
            Reset
          </Button>
        </Box>
        <Box style={{ display: "flex", height: "100%", width: "100%" }}>
          <View index={1} style={{ overflow: "hidden", position: "relative", height: "100%", width: "100%", zIndex: 1 }}>
            <color attach="background" args={[backgroundColor]} />
            <OrthographicCamera makeDefault position={[-10, 0, 0]} rotation={[0, -Math.PI / 2, 0]} zoom={100} args={[-100, 100, 100, -100, -100, 100]} layers={yzLayer}/>
            <Scene labelY={labelY} labelZ={labelZ} vectors={vectors}/>
            <OrbitControls ref={yzOrbitControlRef} enableRotate={false} enableDamping={false}
              mouseButtons={{
                LEFT: THREE.MOUSE.PAN,
                MIDDLE: THREE.MOUSE.DOLLY,
                RIGHT: THREE.MOUSE.ROTATE,
              }}
            />
          </View>
          <Button sx={{ position: "absolute", zIndex: 3 }} onClick={() => yzOrbitControlRef.current.reset()}>
            Reset
          </Button>
        </Box>
      </Box>
      <Canvas eventSource={ref} style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, overflow: 'hidden' }}>
        <View.Port />
      </Canvas>
    </Box>
  )
}

const Scene: FC<VectorPlotProps> = ({
  labelX,
  labelY,
  labelZ,
  vectors = [],
}) => {
  const { mode, systemMode } = useColorScheme();
  var actualMode = mode;
  if (mode === "system") {
    actualMode = systemMode;
  }
  const lineColor = actualMode === "light" ? 'black' : 'white';
  return (<>
      {/* grid */}
      <gridHelper args={[10, 100, "grey", "grey"]} layers={LayerEnum.GRID_MAIN}/>
      <gridHelper position={[0, 10, 0]} args={[10, 100, "grey", "grey"]} layers={LayerEnum.GRID_XZ}/>
      <gridHelper position={[10, 0, 0]} rotation={[0, 0, Math.PI / 2]} args={[10, 100, "grey", "grey"]} layers={LayerEnum.GRID_YZ}/>
      <gridHelper position={[0, 0, -10]} rotation={[Math.PI / 2, 0, 0]} args={[10, 100, "grey", "grey"]} layers={LayerEnum.GRID_XY}/>
      {/* axis */}
      <Line points={[[0, 0, 0], [1, 0, 0]]} color="red" linewidth={2} layers={LayerEnum.AXIS_X}/>
      <Line points={[[0, 0, 0], [0, 1, 0]]} color="green" linewidth={2} layers={LayerEnum.AXIS_Y}/>
      <Line points={[[0, 0, 0], [0, 0, 1]]} color="blue" linewidth={2} layers={LayerEnum.AXIS_Z}/>
      <Html style={{ whiteSpace: "nowrap", userSelect: "none" }} position={[1.1, 0, 0]} center layers={LayerEnum.AXIS_X}>
        {labelX}
      </Html>
      <Html style={{ whiteSpace: "nowrap", userSelect: "none" }} position={[0, 1.1, 0]} center layers={LayerEnum.AXIS_Y}>
        {labelY}
      </Html>
      <Html style={{ whiteSpace: "nowrap", userSelect: "none" }} position={[0, 0, 1.1]} center layers={LayerEnum.AXIS_Z}>
        {labelZ}
      </Html>
      {/* vectors */}
      {vectors.map(({x, y , z, label}) => {
        const vector3d = new Vector3(x, y, z);
        const offset = vector3d.clone();
        offset.divideScalar(vector3d.length()).multiplyScalar(0.05);
        offset.x = offset.x || 0;
        offset.y = offset.y || 0;
        offset.z = offset.z || 0;
        return (
          <>
          <Line points={[[0, 0, 0], [x, y, z]]} color={lineColor} linewidth={2} layers={LayerEnum.DEFAULT}/>
          <Html style={{ whiteSpace: "nowrap", userSelect: "none" }} position={vector3d.add(offset)} center layers={LayerEnum.DEFAULT}>
            {label}
          </Html>
          </>
        );
      })}
    </>);
}
