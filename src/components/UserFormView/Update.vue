<template>
  <el-dialog title="更新信息" :visible.sync="updateFormVisible" :before-close="handleClose">
    <el-form :model="updateForm">
      <!-- <el-form-item label="头像更新" :label-width="formLabelWidth">
        <vue-core-image-upload :class="['btn', 'btn-primary']" inputOfFile="file" :crop="false" :header="updateFormHeader" @imageuploaded="imageuploaded" :max-file-size="5242880" url="//api.musixise.com/api/picture/uploadPic" ></vue-core-image-upload>
      </el-form-item> -->
      <el-form-item label="生日" :label-width="formLabelWidth">
        <el-date-picker v-model="updateForm.birth" type="date" :placeholder="updateFormPlaceholder.birth?updateFormPlaceholder.birth:'请选择日期'" :default-value="updateFormPlaceholder.birth?updateFormPlaceholder.birth:'1990/02/24'"></el-date-picker>
      </el-form-item>
      <el-form-item label="个人介绍" :label-width="formLabelWidth">
        <el-input :placeholder="updateFormPlaceholder.brief?updateFormPlaceholder.brief:'赶紧写点嘛儿'" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="updateForm.brief"></el-input>
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth">
        <el-radio-group v-model="updateForm.gender">
          <el-radio label="male"></el-radio>
          <el-radio label="female"></el-radio>
          <el-radio label="other"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="国籍" :label-width="formLabelWidth">
        <el-select v-model="nationvalue" :placeholder="updateFormPlaceholder.nation?countryMap[updateFormPlaceholder.nation]:'请选择国家'">
          <el-option v-for="country in countries" :label="country.label" :value="country.value"><flag :iso="country.iso" />{{ country.label }}</el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hideUpdateDialog">取消</el-button>
      <el-button type="primary" @click="submitUpdateForm">确认</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      updateFormHeader: {
        dataType: "json",
        type: "POST"
      },
      updateForm: {
        tel: "",
        email: "",
        gender: "",
        birth: "",
        nation: "",
        smallAvatar: "",
        largeAvatar: "",
        brief: ""
      },
      formLabelWidth: "120px",
      countryMap: {
        Japan: "日本",
        America: "美国",
        China: "中国",
        Germany: "德国"
      },
      countries: [
        {
          value: "China",
          label: "中国",
          iso: "cn"
        },
        {
          value: "Japan",
          label: "日本",
          iso: "jp"
        },
        {
          value: "America",
          label: "美国",
          iso: "us"
        },
        {
          value: "Germany",
          label: "德国",
          iso: "de"
        }
      ],
      nationvalue: ""
    };
  },
  computed: {
    updateFormVisible() {
      return this.$store.state.dialog.updateuser;
    },
    updateFormPlaceholder() {
      return this.$store.state.user.userInfo;
    }
  },
  watch: {
    nationvalue(val) {
      // for no reason.... need to do this, cannot bind directly...
      this.$set(this.updateForm, "nation", val);
      console.log(this.updateForm);
    }
  },
  methods: {
    handleClose() {
      // cuz registerrFormVisible is bind with state, it cannot close automatically, we need to close in this before-close event
      this.hideUpdateDialog();
    },
    hideUpdateDialog() {
      this.$store.commit("HIDE_DIALOG", { type: "updateuser" });
    },
    submitUpdateForm() {
      const self = this;
      this.$store.dispatch("updateUser", { updateInfo: this.updateForm }).then(
        () => {
          self.hideUpdateDialog();
          self.$message({ message: "更新信息成功", type: "success" });
        },
        () => {
          self.$message({ message: "更新信息失败", type: "error" });
        }
      );
    },
    imageuploaded() {}
  },
  mounted() {
    // others can use placeholder, no interference with two-way binding, but radio, v-model is annoying..
    this.updateForm.gender = this.updateFormPlaceholder.gender;
  }
};
</script>

<style scoped lang="scss">
.AvatarMenu {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .avatar {
  }
  .name {
  }
}
</style>
