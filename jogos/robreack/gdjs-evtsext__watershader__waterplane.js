
gdjs.evtsExt__WaterShader__WaterPlane = gdjs.evtsExt__WaterShader__WaterPlane || {};

/**
 * Object generated from Water Plane Three JS
 */
gdjs.evtsExt__WaterShader__WaterPlane.WaterPlane = class WaterPlane extends gdjs.CustomRuntimeObject3D {
  constructor(parentInstanceContainer, objectData, instanceData) {
    super(parentInstanceContainer, objectData, instanceData);
    this._parentInstanceContainer = parentInstanceContainer;

    this._objectData = {};
    
    

    // It calls the onCreated super implementation at the end.
    this.onCreated();
  }

  // Hot-reload:
  updateFromObjectData(oldObjectData, newObjectData) {
    super.updateFromObjectData(oldObjectData, newObjectData);

    this.onHotReloading(this._parentInstanceContainer);
    return true;
  }

  // Properties:
  

  

  
}

// Methods:
gdjs.evtsExt__WaterShader__WaterPlane.WaterPlane.prototype.onCreatedContext = {};
gdjs.evtsExt__WaterShader__WaterPlane.WaterPlane.prototype.onCreatedContext.idToCallbackMap = new Map();
gdjs.evtsExt__WaterShader__WaterPlane.WaterPlane.prototype.onCreatedContext.GDObjectObjects1= [];
gdjs.evtsExt__WaterShader__WaterPlane.WaterPlane.prototype.onCreatedContext.GDNew3DBoxObjects1= [];


gdjs.evtsExt__WaterShader__WaterPlane.WaterPlane.prototype.onCreatedContext.userFunc0x9111c8 = function GDJSInlineCode(runtimeScene, objects, eventsFunctionContext) {
"use strict";
// Retrieve the GDevelop Custom Runtime Object
/** @type {gdjs.CustomRuntimeObject} */
const object = objects[0];

// Define the geometry for a plane. A size of 100x100 is used here.
const planeGeometry = new THREE.PlaneGeometry(100, 100);

// Define a basic material (cyan color) for the plane.
// side: THREE.DoubleSide ensures the plane is visible from both sides.
const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ffff, // Cyan
    side: THREE.DoubleSide
});

// Create the final Three.js mesh using the defined geometry and material
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);

// Add the created Three.js mesh to the GDevelop object's 3D renderer.
// This makes the Three.js mesh visible and attached to the GDevelop object's position/rotation.
object.get3DRendererObject().add(planeMesh);
};
gdjs.evtsExt__WaterShader__WaterPlane.WaterPlane.prototype.onCreatedContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

gdjs.copyArray(eventsFunctionContext.getObjects("Object"), gdjs.evtsExt__WaterShader__WaterPlane.WaterPlane.prototype.onCreatedContext.GDObjectObjects1);

const objects = gdjs.evtsExt__WaterShader__WaterPlane.WaterPlane.prototype.onCreatedContext.GDObjectObjects1;
gdjs.evtsExt__WaterShader__WaterPlane.WaterPlane.prototype.onCreatedContext.userFunc0x9111c8(runtimeScene, objects, eventsFunctionContext);

}


};

gdjs.evtsExt__WaterShader__WaterPlane.WaterPlane.prototype.onCreated = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._instanceContainer;
let scopeInstanceContainer = this._instanceContainer;
var thisObjectList = [this];
var Object = Hashtable.newFrom({Object: thisObjectList});
var thisGDNew3DBoxObjectsList = [...runtimeScene.getObjects("New3DBox")];
var GDNew3DBoxObjects = Hashtable.newFrom({"New3DBox": thisGDNew3DBoxObjectsList});
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
, "New3DBox": GDNew3DBoxObjects
},
  _objectArraysMap: {
"Object": thisObjectList
, "New3DBox": thisGDNew3DBoxObjectsList
},
  _behaviorNamesMap: {
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
  getOnceTriggers: function() { return runtimeScene.getOnceTriggers(); }
};

gdjs.evtsExt__WaterShader__WaterPlane.WaterPlane.prototype.onCreatedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__WaterShader__WaterPlane.WaterPlane.prototype.onCreatedContext.GDNew3DBoxObjects1.length = 0;

gdjs.evtsExt__WaterShader__WaterPlane.WaterPlane.prototype.onCreatedContext.eventsList0(runtimeScene, eventsFunctionContext);
gdjs.evtsExt__WaterShader__WaterPlane.WaterPlane.prototype.onCreatedContext.GDObjectObjects1.length = 0;
gdjs.evtsExt__WaterShader__WaterPlane.WaterPlane.prototype.onCreatedContext.GDNew3DBoxObjects1.length = 0;

gdjs.CustomRuntimeObject.prototype.onCreated.call(this);

return;
}

gdjs.evtsExt__WaterShader__WaterPlane.WaterPlane.prototype.doStepPreEvents = function() {
  this._instanceContainer.getOnceTriggers().startNewFrame();
};


gdjs.registerObject("WaterShader::WaterPlane", gdjs.evtsExt__WaterShader__WaterPlane.WaterPlane);
