gdjs.Game_32SceneCode = {};
gdjs.Game_32SceneCode.localVariables = [];
gdjs.Game_32SceneCode.idToCallbackMap = new Map();
gdjs.Game_32SceneCode.forEachIndex2 = 0;

gdjs.Game_32SceneCode.forEachObjects2 = [];

gdjs.Game_32SceneCode.forEachTemporary2 = null;

gdjs.Game_32SceneCode.forEachTotalCount2 = 0;

gdjs.Game_32SceneCode.GDBackgroundObjects1= [];
gdjs.Game_32SceneCode.GDBackgroundObjects2= [];
gdjs.Game_32SceneCode.GDBackgroundObjects3= [];
gdjs.Game_32SceneCode.GDCoinsObjects1= [];
gdjs.Game_32SceneCode.GDCoinsObjects2= [];
gdjs.Game_32SceneCode.GDCoinsObjects3= [];
gdjs.Game_32SceneCode.GDJumpButtonObjects1= [];
gdjs.Game_32SceneCode.GDJumpButtonObjects2= [];
gdjs.Game_32SceneCode.GDJumpButtonObjects3= [];
gdjs.Game_32SceneCode.GDMoveJoystickObjects1= [];
gdjs.Game_32SceneCode.GDMoveJoystickObjects2= [];
gdjs.Game_32SceneCode.GDMoveJoystickObjects3= [];
gdjs.Game_32SceneCode.GDPlatform_9595GroundObjects1= [];
gdjs.Game_32SceneCode.GDPlatform_9595GroundObjects2= [];
gdjs.Game_32SceneCode.GDPlatform_9595GroundObjects3= [];
gdjs.Game_32SceneCode.GDPickaxeObjects1= [];
gdjs.Game_32SceneCode.GDPickaxeObjects2= [];
gdjs.Game_32SceneCode.GDPickaxeObjects3= [];
gdjs.Game_32SceneCode.GDBlack_9595HoleObjects1= [];
gdjs.Game_32SceneCode.GDBlack_9595HoleObjects2= [];
gdjs.Game_32SceneCode.GDBlack_9595HoleObjects3= [];
gdjs.Game_32SceneCode.GDPlayerObjects1= [];
gdjs.Game_32SceneCode.GDPlayerObjects2= [];
gdjs.Game_32SceneCode.GDPlayerObjects3= [];
gdjs.Game_32SceneCode.GDRedTinySwordsPixelToggleObjects1= [];
gdjs.Game_32SceneCode.GDRedTinySwordsPixelToggleObjects2= [];
gdjs.Game_32SceneCode.GDRedTinySwordsPixelToggleObjects3= [];
gdjs.Game_32SceneCode.GDTinySkullGameOverDialogObjects1= [];
gdjs.Game_32SceneCode.GDTinySkullGameOverDialogObjects2= [];
gdjs.Game_32SceneCode.GDTinySkullGameOverDialogObjects3= [];
gdjs.Game_32SceneCode.GDHealthBarObjects1= [];
gdjs.Game_32SceneCode.GDHealthBarObjects2= [];
gdjs.Game_32SceneCode.GDHealthBarObjects3= [];


gdjs.Game_32SceneCode.mapOfGDgdjs_9546Game_959532SceneCode_9546GDPlayerObjects1Objects = Hashtable.newFrom({"Player": gdjs.Game_32SceneCode.GDPlayerObjects1});
gdjs.Game_32SceneCode.mapOfGDgdjs_9546Game_959532SceneCode_9546GDCoinsObjects1Objects = Hashtable.newFrom({"Coins": gdjs.Game_32SceneCode.GDCoinsObjects1});
gdjs.Game_32SceneCode.mapOfGDgdjs_9546Game_959532SceneCode_9546GDPickaxeObjects1Objects = Hashtable.newFrom({"Pickaxe": gdjs.Game_32SceneCode.GDPickaxeObjects1});
gdjs.Game_32SceneCode.mapOfGDgdjs_9546Game_959532SceneCode_9546GDPlayerObjects1Objects = Hashtable.newFrom({"Player": gdjs.Game_32SceneCode.GDPlayerObjects1});
gdjs.Game_32SceneCode.mapOfGDgdjs_9546Game_959532SceneCode_9546GDPlayerObjects1Objects = Hashtable.newFrom({"Player": gdjs.Game_32SceneCode.GDPlayerObjects1});
gdjs.Game_32SceneCode.mapOfGDgdjs_9546Game_959532SceneCode_9546GDBlack_95959595HoleObjects1Objects = Hashtable.newFrom({"Black_Hole": gdjs.Game_32SceneCode.GDBlack_9595HoleObjects1});
gdjs.Game_32SceneCode.mapOfEmptyGDCoinsObjects = Hashtable.newFrom({"Coins": []});
gdjs.Game_32SceneCode.mapOfEmptyGDPickaxeObjects = Hashtable.newFrom({"Pickaxe": []});
gdjs.Game_32SceneCode.mapOfGDgdjs_9546Game_959532SceneCode_9546GDPickaxeObjects2Objects = Hashtable.newFrom({"Pickaxe": gdjs.Game_32SceneCode.GDPickaxeObjects2});
gdjs.Game_32SceneCode.mapOfGDgdjs_9546Game_959532SceneCode_9546GDPlatform_95959595GroundObjects1Objects = Hashtable.newFrom({"Platform_Ground": gdjs.Game_32SceneCode.GDPlatform_9595GroundObjects1});
gdjs.Game_32SceneCode.eventsList0 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.object.getSceneInstancesCount(runtimeScene, gdjs.Game_32SceneCode.mapOfEmptyGDPickaxeObjects) == 0;
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("Player"), gdjs.Game_32SceneCode.GDPlayerObjects2);
gdjs.Game_32SceneCode.GDPickaxeObjects2.length = 0;

{gdjs.evtTools.object.createObjectOnScene(runtimeScene, gdjs.Game_32SceneCode.mapOfGDgdjs_9546Game_959532SceneCode_9546GDPickaxeObjects2Objects, (( gdjs.Game_32SceneCode.GDPlayerObjects2.length === 0 ) ? 0 :gdjs.Game_32SceneCode.GDPlayerObjects2[0].getCenterXInScene()) + 30, (( gdjs.Game_32SceneCode.GDPlayerObjects2.length === 0 ) ? 0 :gdjs.Game_32SceneCode.GDPlayerObjects2[0].getCenterYInScene()) - 10, "");
}
{runtimeScene.getScene().getVariables().getFromIndex(0).setNumber(1);
}
}

}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(runtimeScene.getObjects("Pickaxe"), gdjs.Game_32SceneCode.GDPickaxeObjects2);
gdjs.copyArray(runtimeScene.getObjects("Player"), gdjs.Game_32SceneCode.GDPlayerObjects2);
{for(var i = 0, len = gdjs.Game_32SceneCode.GDPickaxeObjects2.length ;i < len;++i) {
    gdjs.Game_32SceneCode.GDPickaxeObjects2[i].setPosition((( gdjs.Game_32SceneCode.GDPlayerObjects2.length === 0 ) ? 0 :gdjs.Game_32SceneCode.GDPlayerObjects2[0].getCenterXInScene()) + 30,(( gdjs.Game_32SceneCode.GDPlayerObjects2.length === 0 ) ? 0 :gdjs.Game_32SceneCode.GDPlayerObjects2[0].getCenterYInScene()) - 10);
}
}
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Platform_Ground"), gdjs.Game_32SceneCode.GDPlatform_9595GroundObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.isMouseButtonPressed(runtimeScene, "Left");
if (isConditionTrue_0) {
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.cursorOnObject(gdjs.Game_32SceneCode.mapOfGDgdjs_9546Game_959532SceneCode_9546GDPlatform_95959595GroundObjects1Objects, runtimeScene, true, false);
}
if (isConditionTrue_0) {
/* Reuse gdjs.Game_32SceneCode.GDPlatform_9595GroundObjects1 */
{for(var i = 0, len = gdjs.Game_32SceneCode.GDPlatform_9595GroundObjects1.length ;i < len;++i) {
    gdjs.Game_32SceneCode.GDPlatform_9595GroundObjects1[i].getBehavior("Health").Hit(1, false, false, null);
}
}
}

}


};gdjs.Game_32SceneCode.mapOfEmptyGDPickaxeObjects = Hashtable.newFrom({"Pickaxe": []});
gdjs.Game_32SceneCode.eventsList1 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (runtimeScene.getScene().getVariables().getFromIndex(0).getAsNumber() == 1);
}
if (isConditionTrue_0) {
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.object.getSceneInstancesCount(runtimeScene, gdjs.Game_32SceneCode.mapOfEmptyGDPickaxeObjects) > 0;
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("Pickaxe"), gdjs.Game_32SceneCode.GDPickaxeObjects1);
{for(var i = 0, len = gdjs.Game_32SceneCode.GDPickaxeObjects1.length ;i < len;++i) {
    gdjs.Game_32SceneCode.GDPickaxeObjects1[i].deleteFromScene(runtimeScene);
}
}
{runtimeScene.getScene().getVariables().getFromIndex(0).setNumber(0);
}
}

}


};gdjs.Game_32SceneCode.mapOfGDgdjs_9546Game_959532SceneCode_9546GDHealthBarObjects2Objects = Hashtable.newFrom({"HealthBar": gdjs.Game_32SceneCode.GDHealthBarObjects2});
gdjs.Game_32SceneCode.eventsList2 = function(runtimeScene) {

};gdjs.Game_32SceneCode.eventsList3 = function(runtimeScene) {

{

/* Reuse gdjs.Game_32SceneCode.GDPlatform_9595GroundObjects1 */

for (gdjs.Game_32SceneCode.forEachIndex2 = 0;gdjs.Game_32SceneCode.forEachIndex2 < gdjs.Game_32SceneCode.GDPlatform_9595GroundObjects1.length;++gdjs.Game_32SceneCode.forEachIndex2) {
gdjs.copyArray(runtimeScene.getObjects("HealthBar"), gdjs.Game_32SceneCode.GDHealthBarObjects2);
gdjs.Game_32SceneCode.GDPlatform_9595GroundObjects2.length = 0;


gdjs.Game_32SceneCode.forEachTemporary2 = gdjs.Game_32SceneCode.GDPlatform_9595GroundObjects1[gdjs.Game_32SceneCode.forEachIndex2];
gdjs.Game_32SceneCode.GDPlatform_9595GroundObjects2.push(gdjs.Game_32SceneCode.forEachTemporary2);
let isConditionTrue_0 = false;
if (true) {
{gdjs.evtTools.object.pickNearestObject(gdjs.Game_32SceneCode.mapOfGDgdjs_9546Game_959532SceneCode_9546GDHealthBarObjects2Objects, (( gdjs.Game_32SceneCode.GDPlatform_9595GroundObjects2.length === 0 ) ? 0 :gdjs.Game_32SceneCode.GDPlatform_9595GroundObjects2[0].getCenterXInScene()), (( gdjs.Game_32SceneCode.GDPlatform_9595GroundObjects2.length === 0 ) ? 0 :gdjs.Game_32SceneCode.GDPlatform_9595GroundObjects2[0].getCenterYInScene()) - 20);
}
{for(var i = 0, len = gdjs.Game_32SceneCode.GDHealthBarObjects2.length ;i < len;++i) {
    gdjs.Game_32SceneCode.GDHealthBarObjects2[i].deleteFromScene(runtimeScene);
}
}
{for(var i = 0, len = gdjs.Game_32SceneCode.GDPlatform_9595GroundObjects2.length ;i < len;++i) {
    gdjs.Game_32SceneCode.GDPlatform_9595GroundObjects2[i].deleteFromScene(runtimeScene);
}
}
}
}

}


};gdjs.Game_32SceneCode.mapOfGDgdjs_9546Game_959532SceneCode_9546GDPlatform_95959595GroundObjects2Objects = Hashtable.newFrom({"Platform_Ground": gdjs.Game_32SceneCode.GDPlatform_9595GroundObjects2});
gdjs.Game_32SceneCode.eventsList4 = function(runtimeScene) {

};gdjs.Game_32SceneCode.eventsList5 = function(runtimeScene) {
{

let elseEventsChainSatisfied = false;

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("Black_Hole"), gdjs.Game_32SceneCode.GDBlack_9595HoleObjects1);
gdjs.copyArray(runtimeScene.getObjects("RedTinySwordsPixelToggle"), gdjs.Game_32SceneCode.GDRedTinySwordsPixelToggleObjects1);
gdjs.copyArray(runtimeScene.getObjects("TinySkullGameOverDialog"), gdjs.Game_32SceneCode.GDTinySkullGameOverDialogObjects1);
{gdjs.evtTools.camera.setCameraZoom(runtimeScene, 2, "", 0);
}
{gdjs.evtTools.camera.setCameraZoom(runtimeScene, 2, "Background", 0);
}
{for(var i = 0, len = gdjs.Game_32SceneCode.GDBlack_9595HoleObjects1.length ;i < len;++i) {
    gdjs.Game_32SceneCode.GDBlack_9595HoleObjects1[i].hide();
}
}
{for(var i = 0, len = gdjs.Game_32SceneCode.GDRedTinySwordsPixelToggleObjects1.length ;i < len;++i) {
    gdjs.Game_32SceneCode.GDRedTinySwordsPixelToggleObjects1[i].hide();
}
}
{for(var i = 0, len = gdjs.Game_32SceneCode.GDTinySkullGameOverDialogObjects1.length ;i < len;++i) {
    gdjs.Game_32SceneCode.GDTinySkullGameOverDialogObjects1[i].hide();
}
}
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Coins"), gdjs.Game_32SceneCode.GDCoinsObjects1);
gdjs.copyArray(runtimeScene.getObjects("Player"), gdjs.Game_32SceneCode.GDPlayerObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.object.hitBoxesCollisionTest(gdjs.Game_32SceneCode.mapOfGDgdjs_9546Game_959532SceneCode_9546GDPlayerObjects1Objects, gdjs.Game_32SceneCode.mapOfGDgdjs_9546Game_959532SceneCode_9546GDCoinsObjects1Objects, false, runtimeScene, false);
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("Black_Hole"), gdjs.Game_32SceneCode.GDBlack_9595HoleObjects1);
/* Reuse gdjs.Game_32SceneCode.GDCoinsObjects1 */
{for(var i = 0, len = gdjs.Game_32SceneCode.GDCoinsObjects1.length ;i < len;++i) {
    gdjs.Game_32SceneCode.GDCoinsObjects1[i].deleteFromScene(runtimeScene);
}
}
{gdjs.evtTools.sound.playSound(runtimeScene, "PickupCoin", false, 80, gdjs.randomFloatInRange(1, 1.1));
}
{for(var i = 0, len = gdjs.Game_32SceneCode.GDBlack_9595HoleObjects1.length ;i < len;++i) {
    gdjs.Game_32SceneCode.GDBlack_9595HoleObjects1[i].hide(false);
}
}
{runtimeScene.getScene().getVariables().getFromIndex(1).add(1);
}
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Pickaxe"), gdjs.Game_32SceneCode.GDPickaxeObjects1);
gdjs.copyArray(runtimeScene.getObjects("Player"), gdjs.Game_32SceneCode.GDPlayerObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.object.hitBoxesCollisionTest(gdjs.Game_32SceneCode.mapOfGDgdjs_9546Game_959532SceneCode_9546GDPickaxeObjects1Objects, gdjs.Game_32SceneCode.mapOfGDgdjs_9546Game_959532SceneCode_9546GDPlayerObjects1Objects, false, runtimeScene, false);
if (isConditionTrue_0) {
/* Reuse gdjs.Game_32SceneCode.GDPickaxeObjects1 */
gdjs.copyArray(runtimeScene.getObjects("RedTinySwordsPixelToggle"), gdjs.Game_32SceneCode.GDRedTinySwordsPixelToggleObjects1);
{gdjs.evtTools.sound.playSound(runtimeScene, "New sound effect2", false, 45, 2);
}
{for(var i = 0, len = gdjs.Game_32SceneCode.GDPickaxeObjects1.length ;i < len;++i) {
    gdjs.Game_32SceneCode.GDPickaxeObjects1[i].deleteFromScene(runtimeScene);
}
}
{for(var i = 0, len = gdjs.Game_32SceneCode.GDRedTinySwordsPixelToggleObjects1.length ;i < len;++i) {
    gdjs.Game_32SceneCode.GDRedTinySwordsPixelToggleObjects1[i].hide(false);
}
}
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Black_Hole"), gdjs.Game_32SceneCode.GDBlack_9595HoleObjects1);
gdjs.copyArray(runtimeScene.getObjects("Player"), gdjs.Game_32SceneCode.GDPlayerObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.object.hitBoxesCollisionTest(gdjs.Game_32SceneCode.mapOfGDgdjs_9546Game_959532SceneCode_9546GDPlayerObjects1Objects, gdjs.Game_32SceneCode.mapOfGDgdjs_9546Game_959532SceneCode_9546GDBlack_95959595HoleObjects1Objects, false, runtimeScene, false);
if (isConditionTrue_0) {
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.object.getSceneInstancesCount(runtimeScene, gdjs.Game_32SceneCode.mapOfEmptyGDCoinsObjects) == 0;
}
if (isConditionTrue_0) {
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Player"), gdjs.Game_32SceneCode.GDPlayerObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Game_32SceneCode.GDPlayerObjects1.length;i<l;++i) {
    if ( gdjs.Game_32SceneCode.GDPlayerObjects1[i].getY() >= 1250 ) {
        isConditionTrue_0 = true;
        gdjs.Game_32SceneCode.GDPlayerObjects1[k] = gdjs.Game_32SceneCode.GDPlayerObjects1[i];
        ++k;
    }
}
gdjs.Game_32SceneCode.GDPlayerObjects1.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.Game_32SceneCode.GDPlayerObjects1 */
gdjs.copyArray(runtimeScene.getObjects("TinySkullGameOverDialog"), gdjs.Game_32SceneCode.GDTinySkullGameOverDialogObjects1);
{for(var i = 0, len = gdjs.Game_32SceneCode.GDTinySkullGameOverDialogObjects1.length ;i < len;++i) {
    gdjs.Game_32SceneCode.GDTinySkullGameOverDialogObjects1[i].SetScore(runtimeScene.getScene().getVariables().getFromIndex(1).getAsNumber(), null);
}
}
{for(var i = 0, len = gdjs.Game_32SceneCode.GDPlayerObjects1.length ;i < len;++i) {
    gdjs.Game_32SceneCode.GDPlayerObjects1[i].getBehavior("PlatformerObject").ignoreDefaultControls(true);
}
}
{for(var i = 0, len = gdjs.Game_32SceneCode.GDPlayerObjects1.length ;i < len;++i) {
    gdjs.Game_32SceneCode.GDPlayerObjects1[i].getBehavior("PlatformerObject").setCurrentSpeed(0);
}
}
{for(var i = 0, len = gdjs.Game_32SceneCode.GDPlayerObjects1.length ;i < len;++i) {
    gdjs.Game_32SceneCode.GDPlayerObjects1[i].getBehavior("PlatformerObject").setGravity(0);
}
}
{for(var i = 0, len = gdjs.Game_32SceneCode.GDTinySkullGameOverDialogObjects1.length ;i < len;++i) {
    gdjs.Game_32SceneCode.GDTinySkullGameOverDialogObjects1[i].hide(false);
}
}
}

}


{

gdjs.copyArray(runtimeScene.getObjects("TinySkullGameOverDialog"), gdjs.Game_32SceneCode.GDTinySkullGameOverDialogObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Game_32SceneCode.GDTinySkullGameOverDialogObjects1.length;i<l;++i) {
    if ( gdjs.Game_32SceneCode.GDTinySkullGameOverDialogObjects1[i].IsRestartClicked(null) ) {
        isConditionTrue_0 = true;
        gdjs.Game_32SceneCode.GDTinySkullGameOverDialogObjects1[k] = gdjs.Game_32SceneCode.GDTinySkullGameOverDialogObjects1[i];
        ++k;
    }
}
gdjs.Game_32SceneCode.GDTinySkullGameOverDialogObjects1.length = k;
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "Game Scene", false);
}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("HealthBar"), gdjs.Game_32SceneCode.GDHealthBarObjects1);
{for(var i = 0, len = gdjs.Game_32SceneCode.GDHealthBarObjects1.length ;i < len;++i) {
    gdjs.Game_32SceneCode.GDHealthBarObjects1[i].SetValue(5, null);
}
}
}

}


{

gdjs.copyArray(runtimeScene.getObjects("RedTinySwordsPixelToggle"), gdjs.Game_32SceneCode.GDRedTinySwordsPixelToggleObjects1);

elseEventsChainSatisfied = false;
let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Game_32SceneCode.GDRedTinySwordsPixelToggleObjects1.length;i<l;++i) {
    if ( gdjs.Game_32SceneCode.GDRedTinySwordsPixelToggleObjects1[i].IsChecked(null) ) {
        isConditionTrue_0 = true;
        gdjs.Game_32SceneCode.GDRedTinySwordsPixelToggleObjects1[k] = gdjs.Game_32SceneCode.GDRedTinySwordsPixelToggleObjects1[i];
        ++k;
    }
}
gdjs.Game_32SceneCode.GDRedTinySwordsPixelToggleObjects1.length = k;
if (isConditionTrue_0) {

{ //Subevents
gdjs.Game_32SceneCode.eventsList0(runtimeScene);} //End of subevents
elseEventsChainSatisfied = true;
}

}


{


if (!elseEventsChainSatisfied) {
let isConditionTrue_0 = false;
if (!elseEventsChainSatisfied) {

{ //Subevents
gdjs.Game_32SceneCode.eventsList1(runtimeScene);} //End of subevents
elseEventsChainSatisfied = true;
}
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Platform_Ground"), gdjs.Game_32SceneCode.GDPlatform_9595GroundObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Game_32SceneCode.GDPlatform_9595GroundObjects1.length;i<l;++i) {
    if ( gdjs.Game_32SceneCode.GDPlatform_9595GroundObjects1[i].getBehavior("Health").IsDead(null) ) {
        isConditionTrue_0 = true;
        gdjs.Game_32SceneCode.GDPlatform_9595GroundObjects1[k] = gdjs.Game_32SceneCode.GDPlatform_9595GroundObjects1[i];
        ++k;
    }
}
gdjs.Game_32SceneCode.GDPlatform_9595GroundObjects1.length = k;
if (isConditionTrue_0) {

{ //Subevents
gdjs.Game_32SceneCode.eventsList3(runtimeScene);} //End of subevents
}

}


{

gdjs.copyArray(runtimeScene.getObjects("HealthBar"), gdjs.Game_32SceneCode.GDHealthBarObjects1);

for (gdjs.Game_32SceneCode.forEachIndex2 = 0;gdjs.Game_32SceneCode.forEachIndex2 < gdjs.Game_32SceneCode.GDHealthBarObjects1.length;++gdjs.Game_32SceneCode.forEachIndex2) {
gdjs.copyArray(runtimeScene.getObjects("Platform_Ground"), gdjs.Game_32SceneCode.GDPlatform_9595GroundObjects2);
gdjs.Game_32SceneCode.GDHealthBarObjects2.length = 0;


gdjs.Game_32SceneCode.forEachTemporary2 = gdjs.Game_32SceneCode.GDHealthBarObjects1[gdjs.Game_32SceneCode.forEachIndex2];
gdjs.Game_32SceneCode.GDHealthBarObjects2.push(gdjs.Game_32SceneCode.forEachTemporary2);
let isConditionTrue_0 = false;
if (true) {
{gdjs.evtTools.object.pickNearestObject(gdjs.Game_32SceneCode.mapOfGDgdjs_9546Game_959532SceneCode_9546GDPlatform_95959595GroundObjects2Objects, (( gdjs.Game_32SceneCode.GDHealthBarObjects2.length === 0 ) ? 0 :gdjs.Game_32SceneCode.GDHealthBarObjects2[0].getCenterXInScene()), (( gdjs.Game_32SceneCode.GDHealthBarObjects2.length === 0 ) ? 0 :gdjs.Game_32SceneCode.GDHealthBarObjects2[0].getCenterYInScene()) + 30);
}
{for(var i = 0, len = gdjs.Game_32SceneCode.GDHealthBarObjects2.length ;i < len;++i) {
    gdjs.Game_32SceneCode.GDHealthBarObjects2[i].SetValue((( gdjs.Game_32SceneCode.GDPlatform_9595GroundObjects2.length === 0 ) ? 0 :gdjs.Game_32SceneCode.GDPlatform_9595GroundObjects2[0].getBehavior("Health").Health(null)), null);
}
}
}
}

}

}

};

gdjs.Game_32SceneCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.Game_32SceneCode.GDBackgroundObjects1.length = 0;
gdjs.Game_32SceneCode.GDBackgroundObjects2.length = 0;
gdjs.Game_32SceneCode.GDBackgroundObjects3.length = 0;
gdjs.Game_32SceneCode.GDCoinsObjects1.length = 0;
gdjs.Game_32SceneCode.GDCoinsObjects2.length = 0;
gdjs.Game_32SceneCode.GDCoinsObjects3.length = 0;
gdjs.Game_32SceneCode.GDJumpButtonObjects1.length = 0;
gdjs.Game_32SceneCode.GDJumpButtonObjects2.length = 0;
gdjs.Game_32SceneCode.GDJumpButtonObjects3.length = 0;
gdjs.Game_32SceneCode.GDMoveJoystickObjects1.length = 0;
gdjs.Game_32SceneCode.GDMoveJoystickObjects2.length = 0;
gdjs.Game_32SceneCode.GDMoveJoystickObjects3.length = 0;
gdjs.Game_32SceneCode.GDPlatform_9595GroundObjects1.length = 0;
gdjs.Game_32SceneCode.GDPlatform_9595GroundObjects2.length = 0;
gdjs.Game_32SceneCode.GDPlatform_9595GroundObjects3.length = 0;
gdjs.Game_32SceneCode.GDPickaxeObjects1.length = 0;
gdjs.Game_32SceneCode.GDPickaxeObjects2.length = 0;
gdjs.Game_32SceneCode.GDPickaxeObjects3.length = 0;
gdjs.Game_32SceneCode.GDBlack_9595HoleObjects1.length = 0;
gdjs.Game_32SceneCode.GDBlack_9595HoleObjects2.length = 0;
gdjs.Game_32SceneCode.GDBlack_9595HoleObjects3.length = 0;
gdjs.Game_32SceneCode.GDPlayerObjects1.length = 0;
gdjs.Game_32SceneCode.GDPlayerObjects2.length = 0;
gdjs.Game_32SceneCode.GDPlayerObjects3.length = 0;
gdjs.Game_32SceneCode.GDRedTinySwordsPixelToggleObjects1.length = 0;
gdjs.Game_32SceneCode.GDRedTinySwordsPixelToggleObjects2.length = 0;
gdjs.Game_32SceneCode.GDRedTinySwordsPixelToggleObjects3.length = 0;
gdjs.Game_32SceneCode.GDTinySkullGameOverDialogObjects1.length = 0;
gdjs.Game_32SceneCode.GDTinySkullGameOverDialogObjects2.length = 0;
gdjs.Game_32SceneCode.GDTinySkullGameOverDialogObjects3.length = 0;
gdjs.Game_32SceneCode.GDHealthBarObjects1.length = 0;
gdjs.Game_32SceneCode.GDHealthBarObjects2.length = 0;
gdjs.Game_32SceneCode.GDHealthBarObjects3.length = 0;

gdjs.Game_32SceneCode.eventsList5(runtimeScene);
gdjs.Game_32SceneCode.GDBackgroundObjects1.length = 0;
gdjs.Game_32SceneCode.GDBackgroundObjects2.length = 0;
gdjs.Game_32SceneCode.GDBackgroundObjects3.length = 0;
gdjs.Game_32SceneCode.GDCoinsObjects1.length = 0;
gdjs.Game_32SceneCode.GDCoinsObjects2.length = 0;
gdjs.Game_32SceneCode.GDCoinsObjects3.length = 0;
gdjs.Game_32SceneCode.GDJumpButtonObjects1.length = 0;
gdjs.Game_32SceneCode.GDJumpButtonObjects2.length = 0;
gdjs.Game_32SceneCode.GDJumpButtonObjects3.length = 0;
gdjs.Game_32SceneCode.GDMoveJoystickObjects1.length = 0;
gdjs.Game_32SceneCode.GDMoveJoystickObjects2.length = 0;
gdjs.Game_32SceneCode.GDMoveJoystickObjects3.length = 0;
gdjs.Game_32SceneCode.GDPlatform_9595GroundObjects1.length = 0;
gdjs.Game_32SceneCode.GDPlatform_9595GroundObjects2.length = 0;
gdjs.Game_32SceneCode.GDPlatform_9595GroundObjects3.length = 0;
gdjs.Game_32SceneCode.GDPickaxeObjects1.length = 0;
gdjs.Game_32SceneCode.GDPickaxeObjects2.length = 0;
gdjs.Game_32SceneCode.GDPickaxeObjects3.length = 0;
gdjs.Game_32SceneCode.GDBlack_9595HoleObjects1.length = 0;
gdjs.Game_32SceneCode.GDBlack_9595HoleObjects2.length = 0;
gdjs.Game_32SceneCode.GDBlack_9595HoleObjects3.length = 0;
gdjs.Game_32SceneCode.GDPlayerObjects1.length = 0;
gdjs.Game_32SceneCode.GDPlayerObjects2.length = 0;
gdjs.Game_32SceneCode.GDPlayerObjects3.length = 0;
gdjs.Game_32SceneCode.GDRedTinySwordsPixelToggleObjects1.length = 0;
gdjs.Game_32SceneCode.GDRedTinySwordsPixelToggleObjects2.length = 0;
gdjs.Game_32SceneCode.GDRedTinySwordsPixelToggleObjects3.length = 0;
gdjs.Game_32SceneCode.GDTinySkullGameOverDialogObjects1.length = 0;
gdjs.Game_32SceneCode.GDTinySkullGameOverDialogObjects2.length = 0;
gdjs.Game_32SceneCode.GDTinySkullGameOverDialogObjects3.length = 0;
gdjs.Game_32SceneCode.GDHealthBarObjects1.length = 0;
gdjs.Game_32SceneCode.GDHealthBarObjects2.length = 0;
gdjs.Game_32SceneCode.GDHealthBarObjects3.length = 0;


return;

}

gdjs['Game_32SceneCode'] = gdjs.Game_32SceneCode;
