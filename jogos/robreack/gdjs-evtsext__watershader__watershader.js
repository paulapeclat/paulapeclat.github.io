
gdjs.evtsExt__WaterShader__WaterShader = gdjs.evtsExt__WaterShader__WaterShader || {};

/**
 * Behavior generated from 
 */
gdjs.evtsExt__WaterShader__WaterShader.WaterShader = class WaterShader extends gdjs.RuntimeBehavior {
  constructor(instanceContainer, behaviorData, owner) {
    super(instanceContainer, behaviorData, owner);
    this._runtimeScene = instanceContainer;

    this._onceTriggers = new gdjs.OnceTriggers();
    this._behaviorData = {};
    this._sharedData = gdjs.evtsExt__WaterShader__WaterShader.WaterShader.getSharedData(
      instanceContainer,
      behaviorData.name
    );
    
  }

  // Hot-reload:
  applyBehaviorOverriding(behaviorOverriding) {
    

    return true;
  }

  // Network sync:
  getNetworkSyncData(syncOptions) {
    return {
      ...super.getNetworkSyncData(syncOptions),
      props: {
        
      }
    };
  }
  updateFromNetworkSyncData(networkSyncData, options) {
    super.updateFromNetworkSyncData(networkSyncData, options);
    
  }

  // Properties:
  
}

/**
 * Shared data generated from 
 */
gdjs.evtsExt__WaterShader__WaterShader.WaterShader.SharedData = class WaterShaderSharedData {
  constructor(sharedData) {
    
  }
  
  // Shared properties:
  
}

gdjs.evtsExt__WaterShader__WaterShader.WaterShader.getSharedData = function(instanceContainer, behaviorName) {
  if (!instanceContainer._WaterShader_WaterShaderSharedData) {
    const initialData = instanceContainer.getInitialSharedDataForBehavior(
      behaviorName
    );
    instanceContainer._WaterShader_WaterShaderSharedData = new gdjs.evtsExt__WaterShader__WaterShader.WaterShader.SharedData(
      initialData
    );
  }
  return instanceContainer._WaterShader_WaterShaderSharedData;
}

// Methods:
gdjs.evtsExt__WaterShader__WaterShader.WaterShader.prototype.onCreatedContext = {};
gdjs.evtsExt__WaterShader__WaterShader.WaterShader.prototype.onCreatedContext.idToCallbackMap = new Map();
gdjs.evtsExt__WaterShader__WaterShader.WaterShader.prototype.onCreatedContext.GDObjectObjects1= [];


gdjs.evtsExt__WaterShader__WaterShader.WaterShader.prototype.onCreatedContext.userFunc0xe86288 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
if (objects.length > 0) {
    // Target the first selected object in the GDevelop event
    const gdjsObject = objects[0];
    const mesh = gdjsObject.get3DRendererObject();

    // Initialize Three.js context. 
    // Get the core Three.js renderer instance from the GDevelop game object
    const renderer = runtimeScene.getGame().getRenderer().getThreeRenderer();

    // Get the current Three.js camera for uniform data
    const mainCamera = runtimeScene.getLayer()._renderer.getThreeCamera();

    // Create the core water shader material
    const waterMaterial = new THREE.ShaderMaterial({
        side: THREE.DoubleSide,
        transparent: true,
        defines: {
            // Define constants for shader logic based on camera type
            ORTHOGRAPHIC_CAMERA: mainCamera.isOrthographicCamera ? 1 : 0
        },
        uniforms: {
            // Animation time uniform (must be updated every frame)
            time: { value: 0 },
            // Colors
            foamColor: { value: new THREE.Color(0xffffff) },
            waterColorSurface: { value: new THREE.Color(0x2b7ee4) },
            // Displacement scale for DUDV noise
            displacementMultiplier: { value: 0.005 },
            tiling: { value: 0.5 },
            // Camera properties for depth reconstruction
            cameraNear: { value: mainCamera.near },
            cameraFar: { value: mainCamera.far }
        },
        vertexShader: `
            varying vec2 vPlaneUV;

            void main() {
                // Use object local X/Y coordinates as plane UVs for tiling
                vPlaneUV = position.xy; 

                // Standard Three.js processing
                #include <begin_vertex>
                #include <project_vertex>
                #include <fog_vertex>
            }
        `,

        fragmentShader: `
           // Standard Three.js headers
           #include <common>
            #include <packing>
            #include <fog_pars_fragment>


            varying vec2 vPlaneUV; 
            
            // Uniforms defined in JavaScript
            uniform sampler2D tDudv;
            uniform vec3 foamColor;
            uniform vec3 waterColorSurface;
            uniform float cameraNear;
            uniform float displacementMultiplier;
            uniform float tiling;
            uniform float cameraFar;
            uniform float time;
            uniform vec2 resolution;

            // --- Water shader configuration defines ---
            #define ANTIALIAS 1
            #define DISTORT_WATER 1
            #define PARALLAX_WATER 1
            #define FAST_CIRCLES 1

            // Secondary, darker water color for texture mixing
            #define waterColorSecondary (waterColorSurface * 0.8) 
            #define M_2PI 6.283185307
            #define M_6PI 18.84955592

            // Standard PRNG
            float random(vec2 uv) {
                return fract(sin(dot(uv.xy, vec2(12.9898,78.233))) * 43758.5453123);
            }

            // Interpolated noise function
            float noise(vec2 uv) {
                vec2 i = floor(uv);
                vec2 f = fract(uv);
                float a = random(i);
                float b = random(i + vec2(1.0, 0.0));
                float c = random(i + vec2(0.0, 1.0));
                float d = random(i + vec2(1.0, 1.0));
                vec2 u = f*f*(3.0-2.0*f);
                return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
            }

            // Fractal Brownian Motion (FBM) for complex noise
            float fbm(vec2 uv) {
                int octaves = 6;
                float amplitude = 0.5;
                float frequency = 3.0;
                float value = 0.0;
                
                for(int i = 0; i < octaves; i++) {
                    value += amplitude * noise(frequency * uv);
                    amplitude *= 0.5;
                    frequency *= 2.0;
                }
                return value;
            }

            // Procedural DUDV (distortion map) using FBM
            vec2 proceduralDuDv(vec2 uv, float time) {
                float n1 = fbm(uv + time * 0.1);
                float n2 = fbm(uv * 2.0 - time * 0.2);
                
                // Map from [0,1] -> [-1,1] range
                vec2 dudv = vec2(n1, n2) * 2.0 - 1.0;
                
                return dudv * 0.5; // scale the distortion
            }



            // Function to generate a circle/spot mask
            float circ(vec2 pos, vec2 c, float s) {
                c = abs(pos - c);
                c = min(c, 1.0 - c);
            #if FAST_CIRCLES
                return dot(c,c) < s ? -1.0 : 0.0;
            #else
                return smoothstep(0.0,0.002, sqrt(s)-sqrt(dot(c,c))) * -1.0;
            #endif
            }

            // Function to create the water texture layer
            float waterlayer(vec2 uv) {
                uv = mod(uv, 1.0);
                float ret = 1.0;
                ret += circ(uv, vec2(0.37378, 0.277169), 0.0268181);
                ret += circ(uv, vec2(0.0317477, 0.540372), 0.0193742);
                ret += circ(uv, vec2(0.430044, 0.882218), 0.0232337);
                ret += circ(uv, vec2(0.641033, 0.695106), 0.0117864);
                ret += circ(uv, vec2(0.0146398, 0.0791346), 0.0299458);
                ret += circ(uv, vec2(0.43871, 0.394445), 0.0289087);
                ret += circ(uv, vec2(0.909446, 0.878141), 0.028466);
                ret += circ(uv, vec2(0.310149, 0.686637), 0.0128496);
                ret += circ(uv, vec2(0.928617, 0.195986), 0.0152041);
                ret += circ(uv, vec2(0.0438506, 0.868153), 0.0268601);
                ret += circ(uv, vec2(0.308619, 0.194937), 0.00806102);
                ret += circ(uv, vec2(0.349922, 0.449714), 0.00928667);
                ret += circ(uv, vec2(0.0449556, 0.953415), 0.023126);
                ret += circ(uv, vec2(0.117761, 0.503309), 0.0151272);
                ret += circ(uv, vec2(0.563517, 0.244991), 0.0292322);
                ret += circ(uv, vec2(0.566936, 0.954457), 0.00981141);
                ret += circ(uv, vec2(0.0489944, 0.200931), 0.0178746);
                ret += circ(uv, vec2(0.569297, 0.624893), 0.0132408);
                ret += circ(uv, vec2(0.298347, 0.710972), 0.0114426);
                ret += circ(uv, vec2(0.878141, 0.771279), 0.00322719);
                ret += circ(uv, vec2(0.150995, 0.376221), 0.00216157);
                ret += circ(uv, vec2(0.119673, 0.541984), 0.0124621);
                ret += circ(uv, vec2(0.629598, 0.295629), 0.0198736);
                ret += circ(uv, vec2(0.334357, 0.266278), 0.0187145);
                ret += circ(uv, vec2(0.918044, 0.968163), 0.0182928);
                ret += circ(uv, vec2(0.965445, 0.505026), 0.006348);
                ret += circ(uv, vec2(0.514847, 0.865444), 0.00623523);
                ret += circ(uv, vec2(0.710575, 0.0415131), 0.00322689);
                ret += circ(uv, vec2(0.71403, 0.576945), 0.0215641);
                ret += circ(uv, vec2(0.748873, 0.413325), 0.0110795);
                ret += circ(uv, vec2(0.0623365, 0.896713), 0.0236203);
                ret += circ(uv, vec2(0.980482, 0.473849), 0.00573439);
                ret += circ(uv, vec2(0.647463, 0.654349), 0.0188713);
                ret += circ(uv, vec2(0.651406, 0.981297), 0.00710875);
                ret += circ(uv, vec2(0.428928, 0.382426), 0.0298806);
                ret += circ(uv, vec2(0.811545, 0.62568), 0.00265539);
                ret += circ(uv, vec2(0.400787, 0.74162), 0.00486609);
                ret += circ(uv, vec2(0.331283, 0.418536), 0.00598028);
                ret += circ(uv, vec2(0.894762, 0.0657997), 0.00760375);
                ret += circ(uv, vec2(0.525104, 0.572233), 0.0141796);
                ret += circ(uv, vec2(0.431526, 0.911372), 0.0213234);
                ret += circ(uv, vec2(0.658212, 0.910553), 0.000741023);
                ret += circ(uv, vec2(0.514523, 0.243263), 0.0270685);
                ret += circ(uv, vec2(0.0249494, 0.252872), 0.00876653);
                ret += circ(uv, vec2(0.502214, 0.47269), 0.0234534);
                ret += circ(uv, vec2(0.693271, 0.431469), 0.0246533);
                ret += circ(uv, vec2(0.415, 0.884418), 0.0271696);
                ret += circ(uv, vec2(0.149073, 0.41204), 0.00497198);
                ret += circ(uv, vec2(0.533816, 0.897634), 0.00650833);
                ret += circ(uv, vec2(0.0409132, 0.83406), 0.0191398);
                ret += circ(uv, vec2(0.638585, 0.646019), 0.0206129);
                ret += circ(uv, vec2(0.660342, 0.966541), 0.0053511);
                ret += circ(uv, vec2(0.513783, 0.142233), 0.00471653);
                ret += circ(uv, vec2(0.124305, 0.644263), 0.00116724);
                ret += circ(uv, vec2(0.99871, 0.583864), 0.0107329);
                ret += circ(uv, vec2(0.894879, 0.233289), 0.00667092);
                ret += circ(uv, vec2(0.246286, 0.682766), 0.00411623);
                ret += circ(uv, vec2(0.0761895, 0.16327), 0.0145935);
                ret += circ(uv, vec2(0.949386, 0.802936), 0.0100873);
                ret += circ(uv, vec2(0.480122, 0.196554), 0.0110185);
                ret += circ(uv, vec2(0.896854, 0.803707), 0.013969);
                ret += circ(uv, vec2(0.292865, 0.762973), 0.00566413);
                ret += circ(uv, vec2(0.0995585, 0.117457), 0.00869407);
                ret += circ(uv, vec2(0.377713, 0.00335442), 0.0063147);
                ret += circ(uv, vec2(0.506365, 0.531118), 0.0144016);
                ret += circ(uv, vec2(0.408806, 0.894771), 0.0243923);
                ret += circ(uv, vec2(0.143579, 0.85138), 0.00418529);
                ret += circ(uv, vec2(0.0902811, 0.181775), 0.0108896);
                ret += circ(uv, vec2(0.780695, 0.394644), 0.00475475);
                ret += circ(uv, vec2(0.298036, 0.625531), 0.00325285);
                ret += circ(uv, vec2(0.218423, 0.714537), 0.00157212);
                ret += circ(uv, vec2(0.658836, 0.159556), 0.00225897);
                ret += circ(uv, vec2(0.987324, 0.146545), 0.0288391);
                ret += circ(uv, vec2(0.222646, 0.251694), 0.00092276);
                ret += circ(uv, vec2(0.159826, 0.528063), 0.00605293);
                return max(ret, 0.0);
            }

            // Main function to sample the water texture and apply distortion/animation
           vec3 waterTex(vec2 uv, float iTime) {
                uv *= 4.0; // Base texture tiling multiplier

                #if DISTORT_WATER
                    vec2 a = vec2(0.02,0.02);
                    float h = sin(uv.x + iTime);
                    uv += a*h;
                    h = sin(0.841471*uv.x - 0.540302*uv.y + iTime);
                    uv += a*h;
                #endif
                
                // Initialize distortion vector. This is calculated separately from parallax.
                vec2 dist = vec2(0.0);

                #if PARALLAX_WATER
                    // Time-based wave distortion using sine/cosine functions
                    float d1 = mod(uv.x+uv.y, M_2PI);
                    float d2 = mod((uv.x+uv.y+0.25)*1.3, M_6PI);
                    d1 = iTime*0.07 + d1;
                    d2 = iTime*0.5 + d2;
                    dist = vec2(
                        sin(d1)*0.15 + sin(d2)*0.05,
                        cos(d1)*0.15 + cos(d2)*0.05
                    );
                #endif

                // Mix the two water colors using the waterlayer mask
                vec3 base = mix(waterColorSurface, waterColorSecondary, waterlayer(uv+dist));
                // Mix the result with the foam color based on an inverted, distorted layer
                return mix(base, foamColor, waterlayer(vec2(1.0)-uv-dist.yx));
            }


            void main() {   
                     
                // Apply DUDV Distortion based on local plane UVs
                vec2 worldUV = vPlaneUV * tiling;
                vec2 dudvUV = worldUV * 0.2 + time * 0.05;
                
                vec2 displacement = proceduralDuDv(worldUV, time);
                worldUV += displacement * displacementMultiplier;

                // Get final water color
                vec3 waterCol = waterTex(worldUV, time);
                
                // Set final color and transparency
  
                gl_FragColor.rgb =  waterCol;
                gl_FragColor.a = 0.75; //  transparency

                // Standard Three.js post-processing includes
                #include <tonemapping_fragment>
                #include <colorspace_fragment>
                #include <fog_fragment>
            }
        `
    });

    /**
     * Helper function to apply the water material recursively to all meshes in the object.
     */
    function applyMaterialRecursive(object3D, waterMaterial) {
        object3D.traverse(child => {
            if (child.isMesh) {
                // Handle multi-material objects
                if (Array.isArray(child.material)) {
                    child.material = child.material.map(() => waterMaterial);
                }
                // Handle single material objects
                else {
                    child.material = waterMaterial;
                }
                child.needsUpdate = true;
            }
        });
    }

    applyMaterialRecursive(mesh, waterMaterial);

    // Store references on the mesh's userData for the per-frame update script
    mesh.userData.waterMaterial = waterMaterial;
    mesh.userData.mainCamera = mainCamera;
}
};
gdjs.evtsExt__WaterShader__WaterShader.WaterShader.prototype.onCreatedContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__WaterShader__WaterShader.WaterShader.prototype.onCreatedContext.GDObjectObjects1);

const objects = gdjs.evtsExt__WaterShader__WaterShader.WaterShader.prototype.onCreatedContext.GDObjectObjects1;
gdjs.evtsExt__WaterShader__WaterShader.WaterShader.prototype.onCreatedContext.userFunc0xe86288(runtimeScene, objects, eventsFunctionContext);

}


};

gdjs.evtsExt__WaterShader__WaterShader.WaterShader.prototype.onCreated = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._runtimeScene;
let scopeInstanceContainer = null;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("WaterShader"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("WaterShader"),
  localVariables: [],
  getObjects: function(objectName) {
    return eventsFunctionContext._objectArraysMap[objectName] || [];
  },
  getObjectsLists: function(objectName) {
    return eventsFunctionContext._objectsMap[objectName] || null;
  },
  getBehaviorName: function(behaviorName) {
    return eventsFunctionContext._behaviorNamesMap[behaviorName] || behaviorName;
  },
  createObject: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    if (objectsList) {
      const object = parentEventsFunctionContext && !(scopeInstanceContainer && scopeInstanceContainer.isObjectRegistered(objectName)) ?
        parentEventsFunctionContext.createObject(objectsList.firstKey()) :
        runtimeScene.createObject(objectsList.firstKey());
      if (object) {
        objectsList.get(objectsList.firstKey()).push(object);
        if (!(scopeInstanceContainer && scopeInstanceContainer.isObjectRegistered(objectName))) {
          eventsFunctionContext._objectArraysMap[objectName].push(object);
        }
      }
      return object;
    }
    return null;
  },
  getInstancesCountOnScene: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    let count = 0;
    if (objectsList) {
      for(const objectName in objectsList.items)
        count += parentEventsFunctionContext && !(scopeInstanceContainer && scopeInstanceContainer.isObjectRegistered(objectName)) ?
parentEventsFunctionContext.getInstancesCountOnScene(objectName) :
        runtimeScene.getInstancesCountOnScene(objectName);
    }
    return count;
  },
  getLayer: function(layerName) {
    return runtimeScene.getLayer(layerName);
  },
  getArgument: function(argName) {
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__WaterShader__WaterShader.WaterShader.prototype.onCreatedContext.GDObjectObjects1.length = 0;

gdjs.evtsExt__WaterShader__WaterShader.WaterShader.prototype.onCreatedContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__WaterShader__WaterShader.WaterShader.prototype.onCreatedContext.GDObjectObjects1.length = 0;


return;
}
gdjs.evtsExt__WaterShader__WaterShader.WaterShader.prototype.doStepPreEventsContext = {};
gdjs.evtsExt__WaterShader__WaterShader.WaterShader.prototype.doStepPreEventsContext.idToCallbackMap = new Map();
gdjs.evtsExt__WaterShader__WaterShader.WaterShader.prototype.doStepPreEventsContext.GDObjectObjects1= [];


gdjs.evtsExt__WaterShader__WaterShader.WaterShader.prototype.doStepPreEventsContext.userFunc0xe86288 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
// Updates the water shader uniforms
function updateWaterUniforms(mesh, deltaTime) {
    const mat = mesh.userData.waterMaterial;
    if (!mat) return; // Stop if no water material is attached

    // Update time (used to animate waves)
    mat.uniforms.time.value += deltaTime;

    // Wave displacement strength
    mat.uniforms.displacementMultiplier.value = 0.01;
}

// Get the GDevelop object
const gdjsObject = objects[0];

// Retrieve the 3D mesh from the object
const mesh = gdjsObject.get3DRendererObject();

// deltaTime in seconds for smooth animations
const deltaTime = runtimeScene.getElapsedTime() / 1000;

// Apply uniform updates
updateWaterUniforms(mesh, deltaTime);

};
gdjs.evtsExt__WaterShader__WaterShader.WaterShader.prototype.doStepPreEventsContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__WaterShader__WaterShader.WaterShader.prototype.doStepPreEventsContext.GDObjectObjects1);

const objects = gdjs.evtsExt__WaterShader__WaterShader.WaterShader.prototype.doStepPreEventsContext.GDObjectObjects1;
gdjs.evtsExt__WaterShader__WaterShader.WaterShader.prototype.doStepPreEventsContext.userFunc0xe86288(runtimeScene, objects, eventsFunctionContext);

}


};

gdjs.evtsExt__WaterShader__WaterShader.WaterShader.prototype.doStepPreEvents = function(parentEventsFunctionContext) {
this._onceTriggers.startNewFrame();
var that = this;
var runtimeScene = this._runtimeScene;
let scopeInstanceContainer = null;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("WaterShader"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("WaterShader"),
  localVariables: [],
  getObjects: function(objectName) {
    return eventsFunctionContext._objectArraysMap[objectName] || [];
  },
  getObjectsLists: function(objectName) {
    return eventsFunctionContext._objectsMap[objectName] || null;
  },
  getBehaviorName: function(behaviorName) {
    return eventsFunctionContext._behaviorNamesMap[behaviorName] || behaviorName;
  },
  createObject: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    if (objectsList) {
      const object = parentEventsFunctionContext && !(scopeInstanceContainer && scopeInstanceContainer.isObjectRegistered(objectName)) ?
        parentEventsFunctionContext.createObject(objectsList.firstKey()) :
        runtimeScene.createObject(objectsList.firstKey());
      if (object) {
        objectsList.get(objectsList.firstKey()).push(object);
        if (!(scopeInstanceContainer && scopeInstanceContainer.isObjectRegistered(objectName))) {
          eventsFunctionContext._objectArraysMap[objectName].push(object);
        }
      }
      return object;
    }
    return null;
  },
  getInstancesCountOnScene: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    let count = 0;
    if (objectsList) {
      for(const objectName in objectsList.items)
        count += parentEventsFunctionContext && !(scopeInstanceContainer && scopeInstanceContainer.isObjectRegistered(objectName)) ?
parentEventsFunctionContext.getInstancesCountOnScene(objectName) :
        runtimeScene.getInstancesCountOnScene(objectName);
    }
    return count;
  },
  getLayer: function(layerName) {
    return runtimeScene.getLayer(layerName);
  },
  getArgument: function(argName) {
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

gdjs.evtsExt__WaterShader__WaterShader.WaterShader.prototype.doStepPreEventsContext.GDObjectObjects1.length = 0;

gdjs.evtsExt__WaterShader__WaterShader.WaterShader.prototype.doStepPreEventsContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__WaterShader__WaterShader.WaterShader.prototype.doStepPreEventsContext.GDObjectObjects1.length = 0;


return;
}


gdjs.registerBehavior("WaterShader::WaterShader", gdjs.evtsExt__WaterShader__WaterShader.WaterShader);
