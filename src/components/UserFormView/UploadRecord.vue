<template>
  <el-dialog title="上传作品" :visible.sync="UploadRecordFormVisible" :before-close="handleClose">
    <el-form :model="uploadRecordForm">
      <!-- <el-form-item label="头像更新" :label-width="formLabelWidth">
        <vue-core-image-upload :class="['btn', 'btn-primary']" inputOfFile="file" :crop="false" :header="updateFormHeader" @imageuploaded="imageuploaded" :max-file-size="5242880" url="//api.musixise.com/api/picture/uploadPic" ></vue-core-image-upload>
      </el-form-item> -->
      <el-form-item label="作品名称" :label-width="formLabelWidth">
        <el-input placeholder="为你的作品起个名..." v-model="uploadRecordForm.title"></el-input>
      </el-form-item>
      <el-form-item label="作品介绍" :label-width="formLabelWidth">
        <el-input placeholder="为你的作品加点介绍..." type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="uploadRecordForm.content"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hideUploadRecordDialog">取消</el-button>
      <el-button type="primary" @click="submitUploadRecordForm">确认</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      // updateFormHeader: {
      //   dataType: 'json',
      //   type: 'POST',
      // },
      uploadRecordForm: {
        title: "",
        content: "",
        cover: ""
      },
      formLabelWidth: "120px"
    };
  },
  computed: {
    UploadRecordFormVisible() {
      return this.$store.state.dialog.uploadrecord;
    }
  },

  methods: {
    handleClose() {
      // cuz registerrFormVisible is bind with state, it cannot close automatically, we need to close in this before-close event
      this.hideUploadRecordDialog();
    },
    hideUploadRecordDialog() {
      this.$store.commit("HIDE_DIALOG", { type: "uploadrecord" });
    },
    submitUploadRecordForm() {
      const self = this;
      this.$store
        .dispatch("uploadRecord", {
          record: self.$store.state.perform.recorder,
          info: this.uploadRecordForm
        })
        .then(
          () => {
            self.hideUploadRecordDialog();
            self.$message({ message: "上传作品成功", type: "success" });
          },
          () => {
            self.$message({ message: "上传作品失败", type: "error" });
          }
        );
    },
    imageuploaded() {}
  },
  mounted() {}
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
