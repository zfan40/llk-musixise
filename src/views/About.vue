<template>
<div class="main">
  <header style="height:80px;">
    <p style="background-color:white;height:40px;line-height: 40px;margin:0;padding-left:28px;background-color:#ffcc33;">LLK Musixise</p>
    <div style="background-color:#00bdd4;height: 40px;line-height:40px;padding-left:20px;">
      <i id="play" class="iconfont icon-icon--13" style="font-size:26px;cursor: pointer;" @click="handlePlay"></i>
      <i id="stop" class="iconfont icon-icon--17" style="font-size:26px;cursor: pointer;padding-left:10px;" @click="handleStop"></i>
      <i id="save" class="iconfont icon-icon--1" style="font-size:26px;cursor: pointer;padding-left:10px;" @click="handleSave"></i>
      <i id="load" class="iconfont icon-icon--" style="font-size:26px;cursor: pointer;padding-left:10px;" @click="handleLoad"></i>
      <i id="export-midi" class="iconfont icon-geshi_yinpinmidi" style="font-size:24px;cursor: pointer;padding-left:10px;" @click="handleExportMidi"></i>
      <i id="clear" class="iconfont icon-icon--5" style="font-size:26px;cursor: pointer;padding-left:10px;" @click="handleClear"></i>
      <i id="clear" class="iconfont icon-icon--34" style="font-size:26px;cursor: pointer;padding-left:10px;" @click="handleToggleTutorial"></i>
    </div>
  </header>
  <!-- <div class="blockly-editor" id="blockly-area" style="position:absolute;width:100%;height:100%;left:0;"> -->
  <div class="blockly-editor" id="blockly-area" style="flex:1">
    <div id="blockly-div" style="position:absolute;"></div>
    <xml id="toolbox" style="display: none">
      <category name="Loops" colour="120">
        <block type="controls_repeat_ext">
          <value name="TIMES">
            <shadow type="math_number">
              <field name="NUM">5</field>
            </shadow>
          </value>
        </block>
        <block type="controls_if"></block>
        <block type="controls_for">
          <value name="FROM">
            <block type="math_number">
              <field name="NUM">1</field>
            </block>
          </value>
          <value name="TO">
            <block type="math_number">
              <field name="NUM">10</field>
            </block>
          </value>
          <value name="BY">
            <block type="math_number">
              <field name="NUM">1</field>
            </block>
          </value>
        </block>
        <!-- <block type="controls_whileUntil"></block> -->
        <block type="math_number"></block>
        <block type="variables_get"></block>
      </category>

      <category name="Boolean" colour="65">
        <block type="logic_compare"></block>
        <block type="logic_operation"></block>
        <block type="logic_negate"></block>
        <block type="logic_boolean"></block>
        <block type="logic_null"></block>
        <block type="logic_ternary"></block>
      </category>

      <category name="Math" colour="125">
        <block type="math_number">
          <field name="NUM">123</field>
        </block>
        <block type="math_arithmetic"></block>
        <block type="math_single"></block>
        <block type="math_trig"></block>
        <block type="math_constant"></block>
        <block type="math_number_property"></block>
        <block type="math_round"></block>
        <block type="math_on_list"></block>
        <block type="math_modulo"></block>
        <block type="math_constrain">
          <value name="LOW">
            <block type="math_number">
              <field name="NUM">1</field>
            </block>
          </value>
          <value name="HIGH">
            <block type="math_number">
              <field name="NUM">100</field>
            </block>
          </value>
        </block>
        <block type="math_random_int">
          <value name="FROM">
            <block type="math_number">
              <field name="NUM">1</field>
            </block>
          </value>
          <value name="TO">
            <block type="math_number">
              <field name="NUM">100</field>
            </block>
          </value>
        </block>
        <block type="math_random_float"></block>
      </category>

      <category name="Sounds" colour="355">
        <block type="create_measure"></block>
        <block type="create_measure_on_scale"></block>
        <block type="create_measure_match_zero"></block>
        <block type="create_measure_on_scale_match_zero"></block>
      </category>

      <category name="Timbre" colour="210">
        <block type="text">
          <field name="TEXT">pulse</field>
        </block>
        <block type="text">
          <field name="TEXT">triangle</field>
        </block>
        <block type="text">
          <field name="TEXT">square</field>
        </block>
        <block type="text">
          <field name="TEXT">noise</field>
        </block>
      </category>
      <category name="Sequence" colour="310">
        <block type="text">
          <field name="TEXT">C4,D4,E4,F4</field>
        </block>
        <block type="text">
          <field name="TEXT">C4,D4,E4,F4,G4,A4,B4,C5,E4,E4,E4,E4,E4,E4,E4,E4,G4,G4,G4,G4,G4,G4,G4,G4,B4,B4,B4,B4,B4,B4,B4,B4</field>
        </block>
        <!-- SUPER MARIO - CASTLE THEME -->
        <block type="text">
          <field name="TEXT">[Bb4,D5],G4,[A4,C#5],G4,[Ab4,C5],G4,[A4,C#5],G4,[Bb4,D5],G4,[Cb5,Eb5],G4,[Bb4,D5],G4,[A4,C#5],G4</field>
        </block>
        <block type="text">
          <field name="TEXT">[A4,C#5],Gb4,[Ab4,C5],Gb4,[A4,C#5],Gb4,[Bb4,D5],Gb4,[A4,C#5],Gb4,[Bb4,D5],Gb4,[A4,C#5],Gb4,[Ab4,C5],Gb4</field>
        </block>
        <block type="text">
          <field name="TEXT">[Db5,F5],Bb4,[D5,F#5],Bb4,[Db5,F5],Bb4,[C5,E5],Bb4,[Db5,F5],Bb4,[C5,E5],Bb4,[Cb5,Eb5],Bb4,[C5,E5],Bb4</field>
        </block>
      </category>
      <category name="Beats" colour="255">
        <block type="text">
          <field name="TEXT">0---0---0---0---</field>
        </block>
        <block type="text">
          <field name="TEXT">0000000000000000</field>
        </block>
        <block type="text">
          <field name="TEXT">0--0--0--</field>
        </block>
        <block type="text"></block>
      </category>
      <category name="力度" colour="475">
        <block type="text">
          <field name="TEXT">0.1,0.3,0.5,0.7,0.9,1,1,1,1,1,1,0.9,0.7,0.5,0.3,0.1</field>
        </block>
      </category>
    </xml>
  </div>
  <transition name="slide">
    <div class="tutorial" :style="{height:`${tutorialHeight}px`}" v-show="showTutorial">
      <tutorial />
    </div>
</transition>
</div>
</template>

<script>
import Blockly from "node-blockly/browser"; // import Blockly
import Tutorial from "@/components/tutorial/Tutorial.vue";
require("../util/blockly/musixise"); // import Structure of Musixise Blocks
var FileSaver = require("file-saver"); // For Midi file export

export default {
  name: "workspace",
  components: {
    Tutorial
  },
  data() {
    return {
      showTutorial:false,
      tutorialHeight:0
    };
  },
  computed: {},
  methods: {
    handlePlay() {
      Blockly.JavaScript.addReservedWords("code");
      Tone.Transport.stop();
      musixiseParts.forEach(item => {
        item.dispose();
      });
      musixiseParts = [];
      var code = Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace()); //把workspace转换为代码
      code += "Tone.Transport.start('+0.1');";
      // Eval can be dangerous. For more controlled execution, check
      // https://github.com/NeilFraser/JS-Interpreter.
      console.log(code);
      try {
        eval(code);
      } catch (error) {
        console.log(error);
      }
    },
    handleStop() {
      Tone.Transport.stop();
      musixiseParts.forEach(item => {
        item.dispose();
      });
      musixiseParts = [];
    },
    handleSave() {
      let xml = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace()); // 当前workspace的block转成xml dom
      let xmlText = Blockly.Xml.domToText(xml);
      console.log(xmlText);
    },
    handleLoad() {
      let workspace = Blockly.getMainWorkspace();
      workspace.clear();
      // let blocklyXmlText =
        '<xml xmlns="http://www.w3.org/1999/xhtml"><variables></variables><block type="create_measure" id="mM$m){~/,PrBeYx.XW?`" x="53" y="-9"><value name="MEASURE"><block type="math_number" id="9Vbe2x+nR($~{pY}m{O-"><field name="NUM">1</field></block></value><value name="TIMBRE"><block type="text" id="OcQphN_XXx{@DKL=4(,c"><field name="TEXT">square</field></block></value><value name="SEQUENCE"><block type="text" id="~irQ6::gWGXmX70*JSvE"><field name="TEXT">[Bb4,D5],G4,[A4,C#5],G4,[Ab4,C5],G4,[A4,C#5],G4,[Bb4,D5],G4,[Cb5,Eb5],G4,[Bb4,D5],G4,[A4,C#5],G4</field></block></value><value name="BEAT"><block type="text" id="+PUY8+8uzjH,U+.br7^T"><field name="TEXT">0000000000000000</field></block></value><next><block type="create_measure" id="1L+|T5^DGNKe=Yd!#2p#"><value name="MEASURE"><block type="math_number" id="`vX{OA7MHQ7*C:H1|W#a"><field name="NUM">2</field></block></value><value name="TIMBRE"><block type="text" id="9JugIX/isGz)B4!,E$fd"><field name="TEXT">square</field></block></value><value name="SEQUENCE"><block type="text" id="H%pLjal-/Wl]%nQ_5`$c"><field name="TEXT">[Bb4,D5],G4,[A4,C#5],G4,[Ab4,C5],G4,[A4,C#5],G4,[Bb4,D5],G4,[Cb5,Eb5],G4,[Bb4,D5],G4,[A4,C#5],G4</field></block></value><value name="BEAT"><block type="text" id="?2`+L,=:V%4}`]Q^9w3`"><field name="TEXT">0000000000000000</field></block></value><next><block type="create_measure" id="H`RYz|g(LD;O+iyS?Yj!"><value name="MEASURE"><block type="math_number" id="X9DS[-GB]_b?w8w549el"><field name="NUM">3</field></block></value><value name="TIMBRE"><block type="text" id="%~rm~fWjR9vabtY8y/dq"><field name="TEXT">square</field></block></value><value name="SEQUENCE"><block type="text" id="~$@b8T9XbFY#UQaGK,dZ"><field name="TEXT">[A4,C#5],Gb4,[Ab4,C5],Gb4,[A4,C#5],Gb4,[Bb4,D5],Gb4,[A4,C#5],Gb4,[Bb4,D5],Gb4,[A4,C#5],Gb4,[Ab4,C5],Gb4</field></block></value><value name="BEAT"><block type="text" id="ScfA^3OEZ9}GlqX]ImkH"><field name="TEXT">0000000000000000</field></block></value><next><block type="create_measure" id="21V^i]Y!k^o){ydIR_pN"><value name="MEASURE"><block type="math_number" id="QS#xo=9^42v{!24ec{)H"><field name="NUM">4</field></block></value><value name="TIMBRE"><block type="text" id="qggBp+!OA(5it(x@aW/*"><field name="TEXT">square</field></block></value><value name="SEQUENCE"><block type="text" id="u*Gaj2c8Y`eQ%x9N{MoN"><field name="TEXT">[A4,C#5],Gb4,[Ab4,C5],Gb4,[A4,C#5],Gb4,[Bb4,D5],Gb4,[A4,C#5],Gb4,[Bb4,D5],Gb4,[A4,C#5],Gb4,[Ab4,C5],Gb4</field></block></value><value name="BEAT"><block type="text" id="/=1T_PPAm@f,oBVG@I-z"><field name="TEXT">0000000000000000</field></block></value><next><block type="create_measure" id="K-7,CiX12%.mzB9g@Sf:"><value name="MEASURE"><block type="math_number" id="q|JA_`O!+jCf6xl4vkIX"><field name="NUM">5</field></block></value><value name="TIMBRE"><block type="text" id=":RX1H}vx;brL~ubH%hI8"><field name="TEXT">square</field></block></value><value name="SEQUENCE"><block type="text" id="]f[Y?0HaF]aB_+}0mp*s"><field name="TEXT">[Db5,F5],Bb4,[D5,F#5],Bb4,[Db5,F5],Bb4,[C5,E5],Bb4,[Db5,F5],Bb4,[C5,E5],Bb4,[Cb5,Eb5],Bb4,[C5,E5],Bb4</field></block></value><value name="BEAT"><block type="text" id="eR9nKfMmbOLKDL[h.]yB"><field name="TEXT">0000000000000000</field></block></value><next><block type="create_measure" id="lu/KPEfGeDJ;9`PXQkMi"><value name="MEASURE"><block type="math_number" id="h)lYjesF[JrCZTaF.Zkr"><field name="NUM">6</field></block></value><value name="TIMBRE"><block type="text" id="0@mqZnBXQn-oWd[Kmc|/"><field name="TEXT">square</field></block></value><value name="SEQUENCE"><block type="text" id="GRYm:Puev:6iJL[2^vzv"><field name="TEXT">[Db5,F5],Bb4,[D5,F#5],Bb4,[Db5,F5],Bb4,[C5,E5],Bb4,[Db5,F5],Bb4,[C5,E5],Bb4,[Cb5,Eb5],Bb4,[C5,E5],Bb4</field></block></value><value name="BEAT"><block type="text" id="t%=vn%2HdL9d)9^^Ir}T"><field name="TEXT">0000000000000000</field></block></value><next><block type="create_measure" id="_kn=~k2q[TjHaO50F.FY"><value name="MEASURE"><block type="math_number" id="Oow.z}xz{Oq.MQ9VBE4l"><field name="NUM">1</field></block></value><value name="TIMBRE"><block type="text" id="{vDBVN),b0nT,y;zAg9w"><field name="TEXT">pulse</field></block></value><value name="SEQUENCE"><block type="text" id="A)Blj~a]@SG|_;G-u;VT"><field name="TEXT">Eb3</field></block></value><value name="BEAT"><block type="text" id="K,r;MLV,RR]py]mER@DO"><field name="TEXT">0</field></block></value><next><block type="create_measure" id="sa^+03_nLIvB:KLtthVj"><value name="MEASURE"><block type="math_number" id="F4vTsx7)keHwEAk.ru3j"><field name="NUM">2</field></block></value><value name="TIMBRE"><block type="text" id="WhHIG+D1v@g=N-}f#cUM"><field name="TEXT">pulse</field></block></value><value name="SEQUENCE"><block type="text" id="6~O=^f+aDs7CCn/ngS*$"><field name="TEXT">D3,Gb3</field></block></value><value name="BEAT"><block type="text" id="A(M~KGzb/2GUe/~{ACWM"><field name="TEXT">00</field></block></value><next><block type="create_measure" id="xEl_@W^nzbIYl/rYr;MO"><value name="MEASURE"><block type="math_number" id="6@P-VgGSikD|,2.@(VV0"><field name="NUM">3</field></block></value><value name="TIMBRE"><block type="text" id="AbTmmR~P0VK11tU?Vg9}"><field name="TEXT">pulse</field></block></value><value name="SEQUENCE"><block type="text" id="olOT^|I%c-8Dt%/k,iKz"><field name="TEXT">F3</field></block></value><value name="BEAT"><block type="text" id="9I`FVz(=H(PDCg3S#s$I"><field name="TEXT">0</field></block></value><next><block type="create_measure" id="PuXq)*2pyuD~:gBKb5)/"><value name="MEASURE"><block type="math_number" id="iT9W;7fEwqc8UGBi~F6b"><field name="NUM">4</field></block></value><value name="TIMBRE"><block type="text" id="A}DZjMBWv+_)0JJ#K}5N"><field name="TEXT">pulse</field></block></value><value name="SEQUENCE"><block type="text" id="oR/hho=mliC+U1~uc68A"><field name="TEXT">E3,Bb3</field></block></value><value name="BEAT"><block type="text" id="n(/H=/9wXzQXGm4m%)F_"><field name="TEXT">00</field></block></value><next><block type="create_measure" id="cwW]U}]|[$jAdVL3{dS)"><value name="MEASURE"><block type="math_number" id="Ct[/GC+{jgn~McpB!$e0"><field name="NUM">5</field></block></value><value name="TIMBRE"><block type="text" id="JC+yr/Vg8#U`!%O2k66p"><field name="TEXT">pulse</field></block></value><value name="SEQUENCE"><block type="text" id="!0TQ+TTuO{K|S]:l#zu{"><field name="TEXT">A3,E3</field></block></value><value name="BEAT"><block type="text" id="6I]Ex`{OIYVFyQYz~xC:"><field name="TEXT">00</field></block></value><next><block type="create_measure" id="R}d:`w^:3,l0+j(tqcZE"><value name="MEASURE"><block type="math_number" id="SU/O@/)aSarVp$iXOqq8"><field name="NUM">6</field></block></value><value name="TIMBRE"><block type="text" id="n,rL[zywHzea}NO9dj0Y"><field name="TEXT">pulse</field></block></value><value name="SEQUENCE"><block type="text" id="MLe|cBXfQr3icKYU:1),"><field name="TEXT">Eb3,E3</field></block></value><value name="BEAT"><block type="text" id="]VK0lf#kc[]~KvSWX!9l"><field name="TEXT">00</field></block></value></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>';

      let blocklyXmlText =
      '<xml xmlns="http://www.w3.org/1999/xhtml"><variables></variables><block type="create_measure_on_scale" id="bX@0l{48LE-j^8sC22%p" x="2" y="-18"><value name="MEASURE"><block type="math_number" id="50t1(J!9}0~h/m4A.hSa"><field name="NUM">1</field></block></value><value name="TIMBRE"><block type="text" id="-^CF2od/D{)5K*@1|r=C"><field name="TEXT">square</field></block></value><value name="SEQUENCE"><block type="text" id="p:[9ILeb+%Zs`=FiWFa+"><field name="TEXT">\'1,\'2,\'3,\'5,1,2,3,5,1\',2\',3\',5\',1\'\',2\'\',3\'\',5\'\'</field></block></value><value name="BEAT"><block type="text" id="}ZVD0pV,+4`3!q|k*#tX"><field name="TEXT">0000000000000000</field></block></value><value name="SCALE"><block type="text" id="*`NPhg=CtXxDj-(EmD7v"><field name="TEXT"></field></block></value><value name="BASENOTE"><block type="text" id="XPsp/a^w!v.RH[ZNYCpL"><field name="TEXT">C4</field></block></value><next><block type="create_measure_on_scale" id="~XWm*wno~rZ|?vNx/v``"><value name="MEASURE"><block type="math_number" id="2}BDqnWWLeG:AjOBvp%3"><field name="NUM">2</field></block></value><value name="TIMBRE"><block type="text" id="Lg:na{$Df_vn[kVYt]lZ"><field name="TEXT">square</field></block></value><value name="SEQUENCE"><block type="text" id="OzrtgY*R2D=XxOKUWoqv"><field name="TEXT">1\'\'\',5\'\',3\'\',2\'\',1\'\',5\',3\',2\',1\',5,3,2,1,\'5,\'3,\'2</field></block></value><value name="BEAT"><block type="text" id="G){S!T]V.I06Gxd7#H`1"><field name="TEXT">0000000000000000</field></block></value><value name="SCALE"><block type="text" id="(LILflj4AbQuzN)W{%Qv"><field name="TEXT"></field></block></value><value name="BASENOTE"><block type="text" id="tajF2+EK_o[-MuQ-3[w6"><field name="TEXT">C4</field></block></value><next><block type="create_measure_on_scale" id="HG=INXmnHpD~GS1y%9[)"><value name="MEASURE"><block type="math_number" id="1C8{9.zM]C*8Jj0!{BsW"><field name="NUM">3</field></block></value><value name="TIMBRE"><block type="text" id=".n~n%[_R;BL!;i!PGWb|"><field name="TEXT">square</field></block></value><value name="SEQUENCE"><block type="text" id="N=/NfNr:D_D[@}rMMZp."><field name="TEXT">\'\'6,\'\'7,\'1,\'3,\'6,\'7,1,3,6,7,1\',3\',6\',7\',1\'\',3\'\'</field></block></value><value name="BEAT"><block type="text" id="H?^fcH|/;y,nymhd93A1"><field name="TEXT">0000000000000000</field></block></value><value name="SCALE"><block type="text" id="|6/jYF?WSBAutDgxB$JR"><field name="TEXT"></field></block></value><value name="BASENOTE"><block type="text" id="+Eo10iz5F#qbn0d1bTd_"><field name="TEXT">C4</field></block></value><next><block type="create_measure_on_scale" id="~g3(B+bc1W*6@/%pdLGg"><value name="MEASURE"><block type="math_number" id="qQawq/hWVubp7{H{}h(m"><field name="NUM">4</field></block></value><value name="TIMBRE"><block type="text" id="Ps,zUJE0Z]qvG,eHe6*@"><field name="TEXT">square</field></block></value><value name="SEQUENCE"><block type="text" id="UZ.)|+^hAwSyYoe@0|ol"><field name="TEXT">6\'\',3\'\',1\'\',7\',6\',3\',1\',7,6,3,1,\'7,\'6,\'3,\'1,\'\'7</field></block></value><value name="BEAT"><block type="text" id="d!v}?F5$bzytY?97/fBN"><field name="TEXT">0000000000000000</field></block></value><value name="SCALE"><block type="text" id="xnv.TT0^sGkG{vExLi!!"><field name="TEXT"></field></block></value><value name="BASENOTE"><block type="text" id="-*{FqfOp[oMHcPtUh?x`"><field name="TEXT">C4</field></block></value><next><block type="create_measure_on_scale" id="%iGDf5$3TH_AhLFCs,JY"><value name="MEASURE"><block type="math_number" id="SN,4AKeDsRzRx]+/6:*|"><field name="NUM">5</field></block></value><value name="TIMBRE"><block type="text" id="OpyGH$.8g^vKrKYQ/Ci("><field name="TEXT">square</field></block></value><value name="SEQUENCE"><block type="text" id="Hts6*{6wX3Dcv$of/^V{"><field name="TEXT">\'\'6,\'1,\'4,\'5,\'6,1,4,5,6,1\',4\',5\',6\',1\'\',4\'\',5\'\'</field></block></value><value name="BEAT"><block type="text" id="LI4W$Qj6|3X91{eT6*5J"><field name="TEXT">0000000000000000</field></block></value><value name="SCALE"><block type="text" id="6/aAGS$-!yjJMWtwL9wu"><field name="TEXT"></field></block></value><value name="BASENOTE"><block type="text" id="M0]l?2I|`S:`wcN+/+H,"><field name="TEXT">C4</field></block></value><next><block type="create_measure_on_scale" id=".$w=9+s~doCuDv4Jhx9x"><value name="MEASURE"><block type="math_number" id="k0a:2fuyp[y0Z9Cb{u/q"><field name="NUM">6</field></block></value><value name="TIMBRE"><block type="text" id="a0tjaaAkQURSmYtT1%:)"><field name="TEXT">square</field></block></value><value name="SEQUENCE"><block type="text" id="!?n!YeyNW~wNU)KSn(=s"><field name="TEXT">6\'\',5\'\',4\'\',1\'\',6\',5\',4\',1\',6,5,4,1,\'6,\'5,\'4,\'1</field></block></value><value name="BEAT"><block type="text" id="GyCq~8#Rl+Gw6.WZu~w$"><field name="TEXT">0000000000000000</field></block></value><value name="SCALE"><block type="text" id="n%u#J7:1~AB5+|58a2,]"><field name="TEXT"></field></block></value><value name="BASENOTE"><block type="text" id="]I.,AL7s!I#qPKeoqRl4"><field name="TEXT">C4</field></block></value><next><block type="create_measure_on_scale" id="FYXla]Xb$?;ozQenadjy"><value name="MEASURE"><block type="math_number" id="VnJ(cm?bN_[0F0UNLK#9"><field name="NUM">7</field></block></value><value name="TIMBRE"><block type="text" id="^$mm(-(Cq(EUxzMA2@3/"><field name="TEXT">square</field></block></value><value name="SEQUENCE"><block type="text" id="dz+!D+HhJ!?*KF~$H)gz"><field name="TEXT">\'\'7,\'2,\'5,\'6,\'7,2,5,6,7,2\',5\',6\',7\',2\'\',5\'\',6\'\'</field></block></value><value name="BEAT"><block type="text" id=":]$?Pqu,K77k4nmnp5$E"><field name="TEXT">0000000000000000</field></block></value><value name="SCALE"><block type="text" id=")(vE7!j4RA_]r2s!}Hcw"><field name="TEXT"></field></block></value><value name="BASENOTE"><block type="text" id="bU7[aNUHw(^XZpLVki3:"><field name="TEXT">C4</field></block></value><next><block type="create_measure_on_scale" id=":?1K:n;NZFIhKwvaS7u."><value name="MEASURE"><block type="math_number" id="f,-b6,~LhFj:1CZ3dpPv"><field name="NUM">8</field></block></value><value name="TIMBRE"><block type="text" id="EZosmACiXDL5+Y(`?{B9"><field name="TEXT">square</field></block></value><value name="SEQUENCE"><block type="text" id="T=O:rkh}Cm/Ux}!Z_?wa"><field name="TEXT">7\'\',6\'\',5\'\',2\'\',7\',6\',5\',2\',7,6,5,2,\'7,\'6,\'5,\'2</field></block></value><value name="BEAT"><block type="text" id="KfHQ1ATGko7uA_+vkZ%@"><field name="TEXT">0000000000000000</field></block></value><value name="SCALE"><block type="text" id="_atWBTD$L9I(*$g,a@3b"><field name="TEXT"></field></block></value><value name="BASENOTE"><block type="text" id="RL-V^%%3o*MJ5v=R{tM4"><field name="TEXT">C4</field></block></value><next><block type="create_measure_on_scale" id="SMDo.M+C$QOlYZwCu+,4"><value name="MEASURE"><block type="math_number" id="J]Sv-i]S(bI^$7q,L/$("><field name="NUM">9</field></block></value><value name="TIMBRE"><block type="text" id="g7BND`EU9Mt_|t=:cK,_"><field name="TEXT">square</field></block></value><value name="SEQUENCE"><block type="text" id="v+6dlgW11NuKwCS.zyuW"><field name="TEXT">\'1,\'3,\'5,\'7,1,3,5,7,1\',3\',5\',7\',1\'\',3\'\',5\'\',7\'\'</field></block></value><value name="BEAT"><block type="text" id="O`aOVJi?W6V6:74#zNTg"><field name="TEXT">0000000000000000</field></block></value><value name="SCALE"><block type="text" id="{$V23Pz`,6!U%1{DyFba"><field name="TEXT"></field></block></value><value name="BASENOTE"><block type="text" id="-~6PX*L]n0BvMbHE%gvk"><field name="TEXT">Ab3</field></block></value><next><block type="create_measure_on_scale" id="AZfi/7V`ezgwAGQ:?fZ_"><value name="MEASURE"><block type="math_number" id="d7eyS-yJ/ZR2g(Cr{m.^"><field name="NUM">10</field></block></value><value name="TIMBRE"><block type="text" id="zMmgW:8Ma91]c-uFyW/j"><field name="TEXT">square</field></block></value><value name="SEQUENCE"><block type="text" id=")JV+r(#*z?qDG|e_K%$;"><field name="TEXT">1\'\'\',7\'\',5\'\',3\'\',1\'\',7\',5\',3\',1\',7,5,3,1,\'7,\'5,\'3</field></block></value><value name="BEAT"><block type="text" id="=ih+ed?lTqC!,3[53!vL"><field name="TEXT">0000000000000000</field></block></value><value name="SCALE"><block type="text" id="l55)u+_^jZAWpuacSkpl"><field name="TEXT"></field></block></value><value name="BASENOTE"><block type="text" id="Ho9tN}x$MvGwb3{J*ye2"><field name="TEXT">Ab3</field></block></value><next><block type="create_measure_on_scale" id=":A%QiMx5vp((L)2r|Uct"><value name="MEASURE"><block type="math_number" id="_bV9trHC;=-Gw^DAErx."><field name="NUM">11</field></block></value><value name="TIMBRE"><block type="text" id="0R0^GQ/X0T_=Ttda~fhW"><field name="TEXT">square</field></block></value><value name="SEQUENCE"><block type="text" id="JDHXfKix9Mi(6?}+oA`T"><field name="TEXT">\'1,\'3,\'5,\'7,1,3,5,7,1\',3\',5\',7\',1\'\',3\'\',5\'\',7\'\'</field></block></value><value name="BEAT"><block type="text" id="bGe1{[qC2tz@UR%vlzs|"><field name="TEXT">0000000000000000</field></block></value><value name="SCALE"><block type="text" id="0M]gHuUJ7A!TL!gsD*+e"><field name="TEXT"></field></block></value><value name="BASENOTE"><block type="text" id="*-/:6Rqc/K!L[XVY^#7:"><field name="TEXT">Bb3</field></block></value><next><block type="create_measure_on_scale" id="UMBCWa!cD]+{:335f.R:"><value name="MEASURE"><block type="math_number" id="|$U[b[:1q3G#X{iemRzT"><field name="NUM">12</field></block></value><value name="TIMBRE"><block type="text" id="[*3{%RTs!)C(ew^2Yx0v"><field name="TEXT">square</field></block></value><value name="SEQUENCE"><block type="text" id="y?m$#+O)`?SW3WgtKf@i"><field name="TEXT">1\'\'\',7\'\',5\'\',3\'\',1\'\',7\',5\',3\',1\',7,5,3,1,\'7,\'5,\'3</field></block></value><value name="BEAT"><block type="text" id="xMA*{AEl]hx5V_z5.tn/"><field name="TEXT">0000000000000000</field></block></value><value name="SCALE"><block type="text" id="HAuMtR#0KrjE-vB3L-f."><field name="TEXT"></field></block></value><value name="BASENOTE"><block type="text" id="-Np2h`ZcFq5w*6eFe5Sj"><field name="TEXT">Bb3</field></block></value><next><block type="create_measure_on_scale" id="?tZ{f4A)QR?!q9H2evBh"><value name="MEASURE"><block type="math_number" id="1@%l./Psz2nYuDc5l)_,"><field name="NUM">13</field></block></value><value name="TIMBRE"><block type="text" id="AN_+,Yu}I-_N|_ilivE^"><field name="TEXT">square</field></block></value><value name="SEQUENCE"><block type="text" id="vY(n+);,4-v0gv5?FpF`"><field name="TEXT">\'1,\'2,\'3,\'5,1,2,3,5,1\',2\',3\',5\',1\'\',2\'\',3\'\',5\'\'</field></block></value><value name="BEAT"><block type="text" id="feW97z?QoX/v(Nk_-v*j"><field name="TEXT">0000000000000000</field></block></value><value name="SCALE"><block type="text" id="ntp7+7t-N7C4#WYcHaId"><field name="TEXT"></field></block></value><value name="BASENOTE"><block type="text" id="`$@M]|E1xib1PMd]]d1!"><field name="TEXT">C4</field></block></value><next><block type="create_measure_on_scale" id="Y58!I3ec3V+Gi6?+/rAO"><value name="MEASURE"><block type="math_number" id="~%[pWTKK37F36CMmC2#x"><field name="NUM">14</field></block></value><value name="TIMBRE"><block type="text" id="JU:L}*r!wcJ$3cu+gbr,"><field name="TEXT">square</field></block></value><value name="SEQUENCE"><block type="text" id="~9W{.T%-^0g,oqDkQi8R"><field name="TEXT">1\'\'\',5\'\',3\'\',2\'\',1\'\',5\',3\',2\',1\',5,3,2,1,\'5,\'3,\'2</field></block></value><value name="BEAT"><block type="text" id="rdq9ok3R~}OmAPu;U#tV"><field name="TEXT">0000000000000000</field></block></value><value name="SCALE"><block type="text" id="4/D?{#:,F%rFxal;=5T!"><field name="TEXT"></field></block></value><value name="BASENOTE"><block type="text" id="{Qj#x2sh,5[FkJ`N^4?i"><field name="TEXT">C4</field></block></value></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></xml>';
      if (blocklyXmlText) {
        Blockly.Xml.domToWorkspace(
          Blockly.Xml.textToDom(blocklyXmlText),
          workspace
        ); // 把xml dom放到workspace里头展示出来
      }
    },
    handleExportMidi() {
      var midi = MidiConvert.create();
      MidiTracks = {}; //erase MidiTracks in createMeasure, might put into store
      var code = Blockly.JavaScript.workspaceToCode(Blockly.getMainWorkspace()); //把workspace转换为代码
      eval(code);
      if (Object.entries(MidiTracks).length === 0) {
        alert("nothing to export");
        return;
      }
      console.log(MidiTracks)
      Object.keys(MidiTracks).forEach((timbre,index)=>{
        let flatten = MidiTracks[timbre].reduce((acc, cur) => acc.concat(cur), []);
        flatten = flatten.reduce((acc, cur) => acc.concat(cur), []); //flatten再一次，以搞定poly音[D3,G3]这种
        flatten.reduce((acc, cur) => {
          return acc.note(cur.midiNo, cur.startTime, cur.duration, cur.velocity);
        }, midi.track(`${index}`).patch(32));
      })

      // 单音色导出DEMO
      // // flatten MidiTracks
      // let flatten = MidiTracks.square.reduce((acc, cur) => acc.concat(cur), []);
      // flatten = flatten.reduce((acc, cur) => acc.concat(cur), []); //flatten再一次，以搞定poly音[D3,G3]这种
      // // flatten.sort((a, b) => (a.startTime - b.startTime));
      // console.log(flatten);
      // // chain problem!
      // flatten.reduce((acc, cur) => {
      //   return acc.note(cur.midiNo, cur.startTime, cur.duration, cur.velocity);
      // }, midi.track("2").patch(32));

      // OFFICIAL DEMO
      // midi
      //   .track()
      //   // select an instrument by its MIDI patch number
      //   .patch(32)
      //   // chain note events: note, time, duration
      //   .note(76, 0, 0.66666)
      //   .note(46, 0, 0.66666)
      //   .note(50, 0, 2)
      //   .note(76, 0.66666, 0.66666)
      //   .note(76, 1.33333, 0.66666);

      const binaryString = midi.encode();
      // write the output
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      var blob = new Blob([bytes], {
        type: "audio/midi;charset=binary"
      });
      FileSaver.saveAs(blob, "output.mid");
    },
    handleClear() {
      let workspace = Blockly.getMainWorkspace();
      workspace.clear();
    },
    handleToggleTutorial() {
      this.showTutorial = !this.showTutorial
    }
  },
  created() {},
  mounted() {
    const self = this;
    var blocklyArea = window.document.getElementById("blockly-area");
    var blocklyDiv = window.document.getElementById("blockly-div");
    console.log(blocklyArea);
    console.log(blocklyDiv);
    var demoWorkspace = Blockly.inject("blockly-div", {
      toolbox: window.document.getElementById("toolbox"),
      toolboxPosition: "end",
      horizontalLayout: true,
      scrollbars: true,
      zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2
      }
    });
    var onresize = function(e) {
      // Compute the absolute coordinates and dimensions of blocklyArea.
      var element = blocklyArea;
      var x = 0;
      var y = 0;
      do {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent;
      } while (element);
      // Position blocklyDiv over blocklyArea.
      blocklyDiv.style.left = x + "px";
      blocklyDiv.style.top = y + "px";
      blocklyDiv.style.width = blocklyArea.offsetWidth + "px";
      blocklyDiv.style.height = blocklyArea.offsetHeight + "px";
      console.log(blocklyArea.offsetWidth,blocklyArea.offsetHeight);
      Blockly.svgResize(demoWorkspace);

      self.tutorialHeight = blocklyArea.offsetHeight
      console.log(self.tutorialHeight)
    };
    window.addEventListener("resize", onresize, false);
    onresize();
    Blockly.svgResize(demoWorkspace);
  },
  updated() {}
};
</script>
<style lang="scss" scoped>
.main {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.tutorial {
  position: absolute;
  left:0;
  width:40%;
  min-width:500px;
  top:80px;
  overflow-y:scroll;
}
.slide-enter-active {
  transition: all .6s ease-out;
}
.slide-leave-active {
  transition: all .6s ease-out;
}
.slide-enter, .slide-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  left:-40%;
}
</style>
