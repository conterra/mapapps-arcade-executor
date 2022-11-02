///
/// Copyright (C) 2022 con terra GmbH (info@conterra.de)
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///         http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///

/*
 * Copyright (C) con terra GmbH
 */

import FeatureLayer from "esri/layers/FeatureLayer";
import arcade from "esri/arcade";
type SimpleVariable = __esri.SimpleVariable;

const profile = {
    variables: [{
        name: "$feature",
        type: "feature"
    } as SimpleVariable,
    {
        name: "$layer",
        type: "featureSet"
    } as SimpleVariable]
};
export class ArcadeExecutor {

    async evaluateExpressionForLayer(arcadeExpression: string, selectedLayer: FeatureLayer): Promise<string> {

        const executor = await arcade.createArcadeExecutor(arcadeExpression, profile);

        selectedLayer.outFields = executor.fieldsUsed;
        const { features } = await selectedLayer.queryFeatures();

        return executor.execute({
            "$feature": features.at(0),
            "$layer": selectedLayer
        });
    }
}
