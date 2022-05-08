/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// main.ts
__export(exports, {
  default: () => ObsidianColumns
});
var import_obsidian = __toModule(require("obsidian"));
var COLUMNNAME = "col";
var COLUMNMD = COLUMNNAME + "-md";
var TOKEN = "!!!";
var DEFAULT_SETTINGS = {
  wrapSize: { value: 100, name: "Minimum width of column", desc: "Columns will have this minimum width before wrapping to a new row. 0 disables column wrapping. Useful for smaller devices" },
  defaultSpan: { value: 1, name: "The default span of an item", desc: "The default width of a column. If the minimum width is specified, the width of the column will be multiplied by this setting." }
};
var parseBoolean = (value) => {
  return value == "yes" || value == "true";
};
var parseObject = (value, typ) => {
  if (typ == "string") {
    return value;
  }
  if (typ == "boolean") {
    return parseBoolean(value);
  }
  if (typ == "number") {
    return parseFloat(value);
  }
};
var processChild = (c) => {
  if (c.firstChild != null && "tagName" in c.firstChild && c.firstChild.tagName == "BR") {
    c.removeChild(c.firstChild);
  }
  let firstChild = c;
  while (firstChild != null) {
    if ("style" in firstChild) {
      firstChild.style.marginTop = "0px";
    }
    firstChild = firstChild.firstChild;
  }
  let lastChild = c;
  while (lastChild != null) {
    if ("style" in lastChild) {
      lastChild.style.marginBottom = "0px";
    }
    lastChild = lastChild.lastChild;
  }
};
var ObsidianColumns = class extends import_obsidian.Plugin {
  constructor() {
    super(...arguments);
    this.generateCssString = (span) => {
      return "flex-grow:" + span.toString() + "; flex-basis:" + (this.settings.wrapSize.value * span).toString() + "px; width:" + (this.settings.wrapSize.value * span).toString() + "px";
    };
  }
  onload() {
    return __async(this, null, function* () {
      yield this.loadSettings();
      this.addSettingTab(new ObsidianColumnsSettings(this.app, this));
      this.registerMarkdownCodeBlockProcessor(COLUMNMD, (source, el, ctx) => {
        const sourcePath = ctx.sourcePath;
        let child = el.createDiv();
        let renderChild = new import_obsidian.MarkdownRenderChild(child);
        ctx.addChild(renderChild);
        import_obsidian.MarkdownRenderer.renderMarkdown(source, child, sourcePath, renderChild);
      });
      this.registerMarkdownCodeBlockProcessor(COLUMNNAME, (source, el, ctx) => {
        const sourcePath = ctx.sourcePath;
        let child = createDiv();
        let renderChild = new import_obsidian.MarkdownRenderChild(child);
        ctx.addChild(renderChild);
        import_obsidian.MarkdownRenderer.renderMarkdown(source, child, sourcePath, renderChild);
        let parent = el.createEl("div", { cls: "columnParent" });
        Array.from(child.children).forEach((c) => {
          let cc = parent.createEl("div", { cls: "columnChild" });
          let renderCc = new import_obsidian.MarkdownRenderChild(cc);
          ctx.addChild(renderCc);
          cc.setAttribute("style", this.generateCssString(this.settings.defaultSpan.value));
          cc.appendChild(c);
          processChild(c);
        });
      });
      let processList = (element, context) => {
        for (let child of Array.from(element.children)) {
          if (child == null) {
            continue;
          }
          if (child.nodeName != "UL" && child.nodeName != "OL") {
            continue;
          }
          for (let listItem of Array.from(child.children)) {
            if (listItem == null) {
              continue;
            }
            if (!listItem.textContent.trim().startsWith(TOKEN + COLUMNNAME)) {
              processList(listItem, context);
              continue;
            }
            child.removeChild(listItem);
            let colParent = element.createEl("div", { cls: "columnParent" });
            let renderColP = new import_obsidian.MarkdownRenderChild(colParent);
            context.addChild(renderColP);
            let itemList = listItem.querySelector("ul, ol");
            if (itemList == null) {
              continue;
            }
            for (let itemListItem of Array.from(itemList.children)) {
              let childDiv = colParent.createEl("div", { cls: "columnChild" });
              let renderColC = new import_obsidian.MarkdownRenderChild(childDiv);
              context.addChild(renderColC);
              let span = parseFloat(itemListItem.textContent.split("\n")[0].split(" ")[0]);
              if (isNaN(span)) {
                span = this.settings.defaultSpan.value;
              }
              childDiv.setAttribute("style", this.generateCssString(span));
              let afterText = false;
              processList(itemListItem, context);
              for (let itemListItemChild of Array.from(itemListItem.childNodes)) {
                if (afterText) {
                  childDiv.appendChild(itemListItemChild);
                }
                if (itemListItemChild.nodeName == "#text") {
                  afterText = true;
                }
              }
              processChild(childDiv);
            }
          }
        }
      };
      this.registerMarkdownPostProcessor((element, context) => {
        processList(element, context);
      });
    });
  }
  onunload() {
  }
  loadSettings() {
    return __async(this, null, function* () {
      this.settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
    });
  }
  saveSettings() {
    return __async(this, null, function* () {
      yield this.saveData(this.settings);
    });
  }
};
var ObsidianColumnsSettings = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Settings for obsidian-columns" });
    let keyvals = Object.entries(DEFAULT_SETTINGS);
    console.log(keyvals);
    for (let keyval of keyvals) {
      new import_obsidian.Setting(containerEl).setName(keyval[1].name).setDesc(keyval[1].desc).addText((text) => text.setPlaceholder(String(keyval[1].value)).setValue(String(this.plugin.settings[keyval[0]].value)).onChange((value) => {
        keyval[1].value = parseObject(value, typeof keyval[1].value);
        this.plugin.saveSettings();
      }));
    }
  }
};
