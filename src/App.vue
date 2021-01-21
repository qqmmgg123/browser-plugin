<template>
  <div id="app" class="bg-white">
    <div
      class="download-header flex header-split-line primary ph-bigger pt-bigger pb-normal"
    >
      <div class="font-normal flex1">{{ $t("downloader_window_title") }}</div>
      <div v-if="searchShow" class="relative">
        <simple-button
          class="absolute"
          :size="16"
          icon="search"
          :style="{
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
          }"
        />
        <simple-button
          class="absolute"
          :size="16"
          icon="delete"
          :style="{
            right: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
          }"
          @click.native.stop="closeSearch"
        />
        <input
          ref="searchInput"
          type="text"
          placeholder="search"
          v-model="keyWord"
          :class="{ active: searchAni }"
          @transitionend="searchTransEnd"
          @input="searchFile"
        />
      </div>
      <div v-else class="flex">
        <simple-button
          :class="`relative ml-biggest ${btn === 'remove' ? 'remove-btn' : ''}`"
          v-for="btn in ['new', 'remove', 'search', 'config']"
          :key="btn"
          :size="16"
          :icon="btn"
          @click.native="btn === 'remove' ? null : onHeaderBtnClick(btn)"
        >
          <div v-if="btn === 'remove'" class="tips-con">
            <div class="arraw"></div>
            <div class="tips pv-normal ph-bigger font-small">
              <div class="mb-normal btn" @click.stop="clearAllRecords">
                {{ $t("clear_all_records") }}
              </div>
              <div class="mb-normal btn" @click.stop="clearAllFailRecords">
                {{ $t("clear_invalid_records") }}
              </div>
              <div class="btn" @click.stop="clearAll">
                {{ $t("clear_records_and_files") }}
              </div>
            </div>
          </div>
        </simple-button>
      </div>
    </div>
    <div class="download-list">
      <div
        v-for="(file, index) in list"
        :key="index"
        class="ph-bigger pv-normal relative header-split-line secondary"
      >
        <div class="flex relative">
          <image-loader
            color="#f1f2f3"
            class="relative"
            :src="`chrome://fileicon/?path=${file.file_name}&scale=1x`"
            :size="40"
          >
            <image-loader
              class="absolute"
              :src="
                require(`@/assets/images/${file.state.toLowerCase()}@2x.png`)
              "
              :size="16"
              :style="{
                bottom: 0,
                right: 0,
                transform: 'translate(20%, 20%)',
              }"
            />
          </image-loader>
          <div class="ml-normal font-small">
            <div>{{ file.file_name }}</div>
            <div class="gray-text-color">
              {{
                file.state === "IN_PROGRESS"
                  ? file.progress_status_text
                  : downloadStatus[
                      file.file_externally_removed ? "REMOVED" : file.state
                    ].text + formatBytes(file.total)
              }}
            </div>
          </div>
          <div
            class="flex absolute"
            :style="{
              top: 0,
              right: 0,
            }"
          >
            <simple-button
              :class="`relative ml-small ${
                btn === 'delete'
                  ? 'delete-btn' + (!!file.tip_show ? ' active' : '')
                  : ''
              }`"
              v-for="btn in downloadStatus[
                file.file_externally_removed ? 'REMOVED' : file.state
              ].icons"
              :key="btn"
              :size="16"
              :icon="btn"
              @click.native="onRightBtnsClick(btn, file)"
              @mousedown.native.stop="() => {}"
            >
              <div v-if="btn === 'delete'" class="tips-con">
                <div
                  @mousedown.stop="() => {}"
                  class="tips pv-smaller font-smaller"
                >
                  <div
                    class="btn pv-smaller ph-small"
                    @click.stop="deleteRecord(file)"
                  >
                    {{ $t("remove_record") }}
                  </div>
                  <div
                    class="btn pv-smaller ph-small mt-smaller"
                    @click.stop="deleteFile(file)"
                  >
                    {{ $t("remove_record_and_file") }}
                  </div>
                </div>
              </div>
            </simple-button>
          </div>
        </div>
        <k-progress
          v-if="file.percent > 0 && file.percent < 100"
          class="absolute-bottom ph-bigger"
          type="line"
          color="rgba(31, 138, 255, 1)"
          bg-color="rgba(236, 236, 236, 1)"
          :line-height="2"
          :show-text="false"
          :percent="file.percent"
        ></k-progress>
      </div>
    </div>
  </div>
</template>

<script>
import KProgress from "k-progress";
import { formatBytes } from "@/util";
import { getDownloads } from "@/api";
import ImageLoader from "@/components/ImageLoader.vue";
import SimpleButton from "@/components/SimpleButton.vue";

export default {
  name: "App",
  components: {
    KProgress,
    ImageLoader,
    SimpleButton,
  },
  data() {
    return {
      timer: null,
      keyWord: "",
      searchShow: false,
      searchAni: false,
      downloadList: [],
      cache: [],
      downloadStatus: {
        DANGEROUS: {
          name: "危险下载",
          icons: ["save", "delete"],
          text: this.$t("dangerous"),
        },
        IN_PROGRESS: {
          name: "下载中",
          icons: ["paused", "delete"],
          text: "",
        },
        PAUSED: {
          name: "暂停",
          icons: ["continue", "delete"],
          text: "",
        },
        INTERRUPTED: {
          name: "中断无法继续",
          icons: ["redownload", "delete"],
          text: this.$t("interrupted"),
        },
        CANCELLED: {
          name: "取消",
          icons: [],
          text: "",
        },
        REMOVED: {
          name: "删除",
          icons: ["redownload", "delete"],
          text: this.$t("removed"),
        },
        COMPLETE: {
          name: "完成",
          icons: ["openfile", "openfolder", "delete"],
          text: "",
        },
      },
    };
  },
  computed: {
    list() {
      return this.downloadList.filter((file) => file.state !== "CANCELLED");
    },
  },
  methods: {
    formatBytes,
    async updateList() {
      let res = await getDownloads();
      let data = res || [];
      if (data) {
        this.downloadList = data;
      }
    },
    showSearch() {
      this.searchShow = true;
      this.cache = [...this.downloadList];
    },
    closeSearch() {
      this.keyWord = "";
      this.searchAni = false;
      this.downloadList = [...this.cache];
      this.cache = [];
    },
    searchTransEnd() {
      if (!this.searchAni) {
        this.searchShow = false;
      } else {
        this.$refs.searchInput.focus();
      }
    },
    searchFile() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        let keyWord = this.keyWord.trim();
        this.downloadList = keyWord
          ? this.downloadList.filter((file) => {
              return file.file_name.indexOf(keyWord) > -1;
            })
          : [...this.cache];
      }, 300);
    },
    onHeaderBtnClick(type) {
      console.log(type);
      switch (type) {
        case "new":
          chrome.send("createDownloadTask", [""]);
          break;
        case "search":
          this.showSearch();
          break;
        case "config":
          chrome.send("mxOpenUrl", ["mx://settings/", 0]);
          break;
        default:
          break;
      }
    },
    onRightBtnsClick(type, file) {
      console.log(type);
      switch (type) {
        case "save":
          chrome.send("saveDangerousRequiringGesture", [file.id.toString()]);
          break;
        case "paused":
          chrome.send("pause", [file.id.toString()]);
          break;
        case "continue":
          chrome.send("resume", [file.id.toString()]);
          break;
        case "openfile":
          chrome.send("openFileRequiringGesture", [file.id.toString()]);
          break;
        case "openfolder":
          chrome.send("openDownloadsFolderRequiringGesture", [""]);
          break;
        case "redownload":
          chrome.send("retryDownload", [file.id.toString()]);
          break;
        case "delete":
          if (file.state === "COMPLETE") {
            file.tip_show = !file.tip_show;
          } else {
            file.tip_show = false;
            this.deleteRecord(file);
          }
          this.downloadList = [...this.downloadList];
          break;
        default:
          break;
      }
    },
    clearAllRecords() {
      chrome.send("clearAll", [""]);
    },
    clearAllFailRecords() {
      chrome.send("clearInvalid", [""]);
    },
    clearAll() {
      chrome.send("clearAllWithFile", [""]);
    },
    deleteRecord(file) {
      chrome.send("remove", [file.id.toString()]);
      file.tip_show = false;
      this.downloadList = [...this.downloadList];
    },
    deleteFile(file) {
      if (file.state === "DANGEROUS") {
        chrome.send("discardDangerous", [file.id.toString()]);
      } else {
        chrome.send("removeWithFile", [file.id.toString()]);
      }
      file.tip_show = false;
      this.downloadList = [...this.downloadList];
    },
  },
  created() {
    document.onmousedown = () => {
      this.downloadList &&
        (this.downloadList = this.downloadList.map((file) => {
          file.tip_show = false;
          return file;
        }));
    };
    window.insertItem = (data) => {
      console.log(data);
      this.updateList();
    };
    window.updateItem = (data) => {
      console.log(data);
      this.updateList();
    };
    window.removeItem = (data) => {
      console.log(data);
      this.updateList();
    };
    window.setDownloads = (data) => {
      console.log(data);
      this.updateList();
    };
    this.updateList();
  },
  mounted() {},
  watch: {
    searchShow(val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.searchInput.offsetWidth;
          this.searchAni = true;
        });
      }
    },
  },
};
</script>

<style lang="scss">
$grayTextColor: rgba(158, 158, 158, 1);
$secondaryColor: rgba(224, 224, 224, 1);
$secondaryHoverColor: rgba(245, 246, 250, 1);
$primaryColor: rgba(31, 138, 255, 1);
$primarycHoverColor: rgba(0, 122, 255, 1);

html,
body {
  height: 100%;
  background: transparent;
  overflow: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: black;
  height: 100%;
  box-sizing: border-box;
  min-width: 400px;
  min-height: 524px;
}

button,
input {
  outline: none;
  border: none;
  box-shadow: none;
  background: transparent;
}

input[type="text"] {
  width: 32px;
  height: 32px;
  background: #fefefe;
  border-radius: 16px;
  border: 1px solid #ffffff;
  padding: 0 38px;
  box-sizing: border-box;
}

input[type="text"] {
  transition: all 0.7s ease 0s;
}

input[type="text"].active {
  border-color: #91b4d4;
  width: 242px;
}

.header-split-line {
  &.primary {
    border-bottom: 1px solid rgba(236, 236, 236, 1);
  }
  &.secondary {
    border-bottom: 1px solid rgba(246, 247, 247, 1);
  }
}

.gray-text-color {
  color: $grayTextColor;
}

.download-header {
  height: 55px;
  box-sizing: border-box;
}

.download-list {
  height: calc(100% - 55px);
  overflow: auto;
}

.tips {
  background: #fefefe;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.35);
  border: 1px solid #979797;
}

.remove-btn,
.delete-btn {
  .tips-con {
    z-index: 1002;
    position: absolute;
    top: 0;
    right: 0;
    .arraw {
      height: 20px;
      width: 32px;
      position: absolute;
      top: -20px;
      right: 0;
    }
    .tips {
      > div {
        white-space: nowrap;
      }
    }
  }
}
.remove-btn {
  .tips-con {
    transition: 0.15s ease-in-out;
    transform: translateY(40px);
    opacity: 0;
    visibility: hidden;
  }
  &:hover {
    .tips-con {
      opacity: 1;
      visibility: visible;
      transform: translateY(20px);
    }
  }
}
.delete-btn {
  .tips-con {
    opacity: 0;
    visibility: hidden;
    transform: translateY(20px);
    .tips > div {
      &:hover {
        border-radius: 0;
        background-color: rgba(240, 240, 245, 1);
      }
    }
  }
  &.active {
    .tips-con {
      opacity: 1;
      visibility: visible;
    }
  }
}

.btn {
  border-radius: 5px;
  &.primary {
    background-color: $primaryColor;
    color: $secondaryColor;
    &:hover {
      background-color: $primarycHoverColor;
    }
  }
  &.secondary {
    background-color: $secondaryColor;
    color: $primaryColor;
    &:hover {
      background-color: $secondaryHoverColor;
    }
  }
}

/* Extendsions */
.k-progress {
  margin: 0;
  .k-progress-outer {
    padding-right: 0;
  }
}
</style>
