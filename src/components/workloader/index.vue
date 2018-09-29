<template>
<el-select v-model="value8" filterable placeholder="作品样例" @change="change">
  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
  </el-option>
</el-select>
</template>

<script>
import Blockly from "node-blockly/browser"; // import Blockly
import {
  test1,
  mario,
  ff,
  pianophase,
  overworldMario,
  chunjiang,
  kentJazz
} from "@/util/demos";
export default {
  data() {
    return {
      options: [
        {
          value: "test",
          label: "test"
        },
        {
          value: "mario",
          label: "mario"
        },
        {
          value: "ff",
          label: "ff"
        },
        {
          value: "pianophase",
          label: "pianophase"
        },
        {
          value: "overworldMario",
          label: "overworldMario"
        },
        {
          value: "chunjiang",
          label: "chunjiang"
        },
        {
          value: "kentJazz",
          label: "kentJazz"
        }
      ],
      value8: ""
    };
  },
  methods: {
    change(e) {
      console.log(e);
      const a = {
        test1,
        mario,
        ff,
        pianophase,
        overworldMario,
        chunjiang,
        kentJazz
      };
      this.loadWork(a[e]);
    },
    loadWork(blocklyXmlText) {
      let workspace = Blockly.getMainWorkspace();
      workspace.clear();
      if (blocklyXmlText) {
        Blockly.Xml.domToWorkspace(
          Blockly.Xml.textToDom(blocklyXmlText),
          workspace
        ); // 把xml dom放到workspace里头展示出来
      }
    }
  }
};
</script>
