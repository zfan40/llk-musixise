/**
 * Copyright 2017 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import Blockly from "node-blockly/browser";
Blockly.defineBlocksWithJsonArray([
  // Block for colour picker.
  {
    type: "create_measure",
    message0: "音符对位 小节 %1 音色 %2 音序 %3 节拍%4",
    args0: [
      {
        type: "input_value",
        name: "MEASURE",
        check: "Number"
      },
      {
        // "type": "field_dropdown",
        // "name": "TIMBRE",
        // "options": [
        //   ["SINE", "sine_synth"],
        //   ["TRIANGLE", "triangle_synth"],
        //   ["SQUARE", "square_synth"]
        // ]
        type: "input_value",
        name: "TIMBRE",
        check: "String"
      },
      {
        type: "input_value",
        name: "SEQUENCE",
        check: "String" //should be array
      },
      {
        type: "input_value",
        name: "BEAT",
        check: "String"
      }
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 355,
    tooltip: "",
    helpUrl: ""
  }
]);

Blockly.JavaScript["create_measure"] = function(block) {
  const measure = Blockly.JavaScript.valueToCode(
    block,
    "MEASURE",
    Blockly.JavaScript.ORDER_NONE
  );
  const timbre = Blockly.JavaScript.valueToCode(
    block,
    "TIMBRE",
    Blockly.JavaScript.ORDER_NONE
  );
  const sequence = Blockly.JavaScript.valueToCode(
    block,
    "SEQUENCE",
    Blockly.JavaScript.ORDER_NONE
  );
  const beat = Blockly.JavaScript.valueToCode(
    block,
    "BEAT",
    Blockly.JavaScript.ORDER_NONE
  );
  return `createMeasure(${measure},${timbre},${sequence},${beat});\n`;
};

Blockly.defineBlocksWithJsonArray([
  // Block for colour picker.
  {
    type: "create_measure_on_scale",
    message0: "简谱对位 %1 音色 %2 音序 %3 节拍%4 调式%5 根音%6",
    args0: [
      {
        type: "input_value",
        name: "MEASURE",
        check: "Number"
      },
      {
        // "type": "field_dropdown",
        // "name": "TIMBRE",
        // "options": [
        //   ["SINE", "sine_synth"],
        //   ["TRIANGLE", "triangle_synth"],
        //   ["SQUARE", "square_synth"]
        // ]
        type: "input_value",
        name: "TIMBRE",
        check: "String"
      },
      {
        type: "input_value",
        name: "SEQUENCE",
        check: "String" //should be array
      },
      {
        type: "input_value",
        name: "BEAT",
        check: "String"
      },
      {
        type: "input_value",
        name: "SCALE",
        check: "String"
      },
      {
        type: "input_value",
        name: "BASENOTE",
        check: "String"
      }
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 355,
    tooltip: "",
    helpUrl: ""
  }
]);

Blockly.JavaScript["create_measure_on_scale"] = function(block) {
  const measure = Blockly.JavaScript.valueToCode(
    block,
    "MEASURE",
    Blockly.JavaScript.ORDER_NONE
  );
  const timbre = Blockly.JavaScript.valueToCode(
    block,
    "TIMBRE",
    Blockly.JavaScript.ORDER_NONE
  );
  const sequence = Blockly.JavaScript.valueToCode(
    block,
    "SEQUENCE",
    Blockly.JavaScript.ORDER_NONE
  );
  const beat = Blockly.JavaScript.valueToCode(
    block,
    "BEAT",
    Blockly.JavaScript.ORDER_NONE
  );
  const scale = Blockly.JavaScript.valueToCode(
    block,
    "SCALE",
    Blockly.JavaScript.ORDER_NONE
  );
  const basenote = Blockly.JavaScript.valueToCode(
    block,
    "BASENOTE",
    Blockly.JavaScript.ORDER_NONE
  );
  return `createMeasureOnScale(${measure},${timbre},${sequence},${beat},${scale},${basenote});\n`;
};

Blockly.defineBlocksWithJsonArray([
  // Block for colour picker.
  {
    type: "create_measure_match_zero",
    message0: "音符不对位 小节 %1 音色 %2 音序 %3 节拍%4",
    args0: [
      {
        type: "input_value",
        name: "MEASURE",
        check: "Number"
      },
      {
        // "type": "field_dropdown",
        // "name": "TIMBRE",
        // "options": [
        //   ["SINE", "sine_synth"],
        //   ["TRIANGLE", "triangle_synth"],
        //   ["SQUARE", "square_synth"]
        // ]
        type: "input_value",
        name: "TIMBRE",
        check: "String"
      },
      {
        type: "input_value",
        name: "SEQUENCE",
        check: "String" //should be array
      },
      {
        type: "input_value",
        name: "BEAT",
        check: "String"
      }
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 355,
    tooltip: "",
    helpUrl: ""
  }
]);

Blockly.JavaScript["create_measure_match_zero"] = function(block) {
  const measure = Blockly.JavaScript.valueToCode(
    block,
    "MEASURE",
    Blockly.JavaScript.ORDER_NONE
  );
  const timbre = Blockly.JavaScript.valueToCode(
    block,
    "TIMBRE",
    Blockly.JavaScript.ORDER_NONE
  );
  const sequence = Blockly.JavaScript.valueToCode(
    block,
    "SEQUENCE",
    Blockly.JavaScript.ORDER_NONE
  );
  const beat = Blockly.JavaScript.valueToCode(
    block,
    "BEAT",
    Blockly.JavaScript.ORDER_NONE
  );
  return `createMeasure(${measure},${timbre},${sequence},${beat},true);\n`;
};

Blockly.defineBlocksWithJsonArray([
  // Block for colour picker.
  {
    type: "create_measure_on_scale_match_zero",
    message0: "简谱不对位 小节 %1 音色 %2 音序 %3 节拍%4 调式%5 根音%6",
    args0: [
      {
        type: "input_value",
        name: "MEASURE",
        check: "Number"
      },
      {
        // "type": "field_dropdown",
        // "name": "TIMBRE",
        // "options": [
        //   ["SINE", "sine_synth"],
        //   ["TRIANGLE", "triangle_synth"],
        //   ["SQUARE", "square_synth"]
        // ]
        type: "input_value",
        name: "TIMBRE",
        check: "String"
      },
      {
        type: "input_value",
        name: "SEQUENCE",
        check: "String" //should be array
      },
      {
        type: "input_value",
        name: "BEAT",
        check: "String"
      },
      {
        type: "input_value",
        name: "SCALE",
        check: "String"
      },
      {
        type: "input_value",
        name: "BASENOTE",
        check: "String"
      }
    ],
    inputsInline: true,
    previousStatement: null,
    nextStatement: null,
    colour: 355,
    tooltip: "",
    helpUrl: ""
  }
]);

Blockly.JavaScript["create_measure_on_scale_match_zero"] = function(block) {
  const measure = Blockly.JavaScript.valueToCode(
    block,
    "MEASURE",
    Blockly.JavaScript.ORDER_NONE
  );
  const timbre = Blockly.JavaScript.valueToCode(
    block,
    "TIMBRE",
    Blockly.JavaScript.ORDER_NONE
  );
  const sequence = Blockly.JavaScript.valueToCode(
    block,
    "SEQUENCE",
    Blockly.JavaScript.ORDER_NONE
  );
  const beat = Blockly.JavaScript.valueToCode(
    block,
    "BEAT",
    Blockly.JavaScript.ORDER_NONE
  );
  const scale = Blockly.JavaScript.valueToCode(
    block,
    "SCALE",
    Blockly.JavaScript.ORDER_NONE
  );
  const basenote = Blockly.JavaScript.valueToCode(
    block,
    "BASENOTE",
    Blockly.JavaScript.ORDER_NONE
  );
  return `createMeasureOnScale(${measure},${timbre},${sequence},${beat},${scale},${basenote},true);\n`;
};
