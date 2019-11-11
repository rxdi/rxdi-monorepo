#!/usr/bin/env node
parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"injection.tokens.ts":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=require("@rxdi/core");exports.LoggerConfig=new e.InjectionToken("logger-config"),exports.Config=new e.InjectionToken("migrations-config"),exports.CommandInjector=new e.InjectionToken("CommandInjector");
},{}],"helpers/log-factory.ts":[function(require,module,exports) {
"use strict";var e,t=this&&this.__decorate||function(e,t,r,s){var o,i=arguments.length,n=i<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,r):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,s);else for(var g=e.length-1;g>=0;g--)(o=e[g])&&(n=(i<3?o(n):i>3?o(t,r,n):o(t,r))||n);return i>3&&n&&Object.defineProperty(t,r,n),n},r=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},s=this&&this.__param||function(e,t){return function(r,s){t(r,s,e)}};Object.defineProperty(exports,"__esModule",{value:!0});const o=require("@rxdi/core"),i=require("../injection.tokens"),n=require("fs");class g{constructor(e,t){this.successLogger=n.createWriteStream(e,{flags:"a"}),this.errorLogger=n.createWriteStream(t,{flags:"a"}),this.successLogger.on("finish",()=>{this.successFinished=!0,console.log("All writes are now complete. for Success logger")}),this.errorLogger.on("finish",()=>{this.errorFinished=!0,console.log("All writes are now complete. for Error logger")})}log(e){return new Promise(t=>{if(!this.successFinished)return this.successLogger.write(this.getLogTemplate(e,"🚀"),t);t()})}error(e){return new Promise(t=>{if(!this.errorFinished)return this.errorLogger.write(this.getLogTemplate(e,"🔥"),t);t()})}close(){this.successLogger.close(),this.errorLogger.close(),this.successLogger.end(),this.errorLogger.end()}getLogTemplate(e,t){return`\n${t} ********* ${new Date} *********\n\n${JSON.stringify(e,null,2)}\n`}}exports.Logger=g;let c=class{constructor(e){this.config=e,this.loggers=new Map}getDownLogger(){return this.create("down",this.getConfig("down"))}getUpLogger(){return this.create("up",this.getConfig("up"))}getConfig(e){return{successPath:`${this.config.folder}/${this.config[e].success}`,errorPath:`${this.config.folder}/${this.config[e].error}`}}closeConnections(){[...this.loggers.values()].forEach(e=>e.close())}create(e,{successPath:t,errorPath:r}){return this.has(e)?this.get(e):(this.loggers.set(e,new g(t,r)),this.get(e))}has(e){return this.loggers.has(e)}get(e){return this.loggers.get(e)}};c=t([o.Injectable(),s(0,o.Inject(i.LoggerConfig)),r("design:paramtypes",["function"==typeof(e=void 0!==i.LoggerConfig&&i.LoggerConfig)?e:Object])],c),exports.LogFactory=c;
},{"../injection.tokens":"injection.tokens.ts"}],"default.config.ts":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.DEFAULT_CONFIG={changelogCollectionName:"migrations",migrationsDir:"migrations",defaultTemplate:"es6",typescript:!0,outDir:"./.xmigrate",logger:{folder:"./migrations-log",up:{success:"up.success.log",error:"up.error.log"},down:{success:"down.success.log",error:"down.error.log"}},mongodb:{url:"mongodb://localhost:27017",databaseName:"test",options:{useNewUrlParser:!0}}};
},{}],"services/config/config.service.ts":[function(require,module,exports) {
"use strict";var e=this&&this.__decorate||function(e,t,r,c){var o,i=arguments.length,n=i<3?t:null===c?c=Object.getOwnPropertyDescriptor(t,r):c;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,r,c);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(n=(i<3?o(n):i>3?o(t,r,n):o(t,r))||n);return i>3&&n&&Object.defineProperty(t,r,n),n};Object.defineProperty(exports,"__esModule",{value:!0});const t=require("@rxdi/core"),r=require("../../default.config");let c=class{constructor(){this.config=r.DEFAULT_CONFIG}set(e){Object.assign(this.config,e)}};c=e([t.Injectable()],c),exports.ConfigService=c;
},{"../../default.config":"default.config.ts"}],"services/database/database.service.ts":[function(require,module,exports) {
"use strict";var e,o=this&&this.__decorate||function(e,o,n,t){var i,c=arguments.length,s=c<3?o:null===t?t=Object.getOwnPropertyDescriptor(o,n):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,o,n,t);else for(var r=e.length-1;r>=0;r--)(i=e[r])&&(s=(c<3?i(s):c>3?i(o,n,s):i(o,n))||s);return c>3&&s&&Object.defineProperty(o,n,s),s},n=this&&this.__metadata||function(e,o){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,o)},t=this&&this.__awaiter||function(e,o,n,t){return new(n||(n=Promise))(function(i,c){function s(e){try{f(t.next(e))}catch(o){c(o)}}function r(e){try{f(t.throw(e))}catch(o){c(o)}}function f(e){e.done?i(e.value):new n(function(o){o(e.value)}).then(s,r)}f((t=t.apply(e,o||[])).next())})};Object.defineProperty(exports,"__esModule",{value:!0});const i=require("@rxdi/core"),c=require("mongodb"),s=require("mongoose"),r=require("../config/config.service");let f=class{constructor(e){this.configService=e,this.connections=new Map,this.connectionsMongoose=new Map}connect(){return t(this,void 0,void 0,function*(){const e=this.configService.config.mongodb.url,o=this.configService.config.mongodb.databaseName;if(!e)throw new Error("No `url` defined in config file!");if(!o)throw new Error("No `databaseName` defined in config file! This is required since migrate-mongo v3. See https://github.com/seppevs/migrate-mongo#initialize-a-new-project");const n=yield this.getMongoClient().connect(e,this.configService.config.mongodb.options),t=n.db.bind(n);return n.db=(e=>t(e||o)),this.setConnections(e,n),n})}getMongoClient(){return c.MongoClient}close(){return t(this,void 0,void 0,function*(){yield Promise.all([...this.connections.values()].map(e=>e.close(!0)))})}closeMongoose(){return t(this,void 0,void 0,function*(){yield Promise.all([...this.connectionsMongoose.values()].map(e=>e.disconnect()))})}setConnections(e,o){this.connections.set(e,o)}setConnectionsMongoose(e,o){this.connectionsMongoose.set(e,o)}connectMongoose(){return s.connect}mongooseConnect(){return t(this,void 0,void 0,function*(){const e=`${this.configService.config.mongodb.url}/${this.configService.config.mongodb.databaseName}`,o=yield this.connectMongoose()(e,this.configService.config.mongodb.options);return this.setConnectionsMongoose(e,o),o})}};f=o([i.Injectable(),n("design:paramtypes",["function"==typeof(e=void 0!==r.ConfigService&&r.ConfigService)?e:Object])],f),exports.DatabaseService=f;
},{"../config/config.service":"services/config/config.service.ts"}],"helpers/date.ts":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=require("date-fns");exports.now=((e=Date.now())=>{const t=new Date(e);return new Date(t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate(),t.getUTCHours(),t.getUTCMinutes(),t.getUTCSeconds(),t.getUTCMilliseconds())}),exports.nowAsString=(()=>e.format(exports.now(),"yyyymmddhhmmss"));
},{}],"templates/native.ts":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default="\nexport async function up (client) {\n  await client\n    .db()\n    .collection('albums')\n    .updateOne({ artist: 'The Beatles' }, { $set: { blacklisted: true } })\n  await client\n    .db()\n    .collection('albums')\n    .updateOne({ artist: 'The Doors' }, { $set: { stars: 5 } })\n},\n\nexport async function down (client) {\n  await client\n    .db()\n    .collection('albums')\n    .updateOne({ artist: 'The Doors' }, { $set: { stars: 0 } })\n  await client\n    .db()\n    .collection('albums')\n    .updateOne({ artist: 'The Beatles' }, { $set: { blacklisted: false } })\n}\n";
},{}],"templates/es5.ts":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default="\nmodule.exports = {\n  async up (client) {\n    return ['Up']\n  },\n\n  async down (client) {\n    return ['Down']\n  }\n}\n";
},{}],"templates/es6.ts":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default="\nexport async function up(client) {\n  return ['Up'];\n}\nexport async function down(client) {\n  return ['Down'];\n}\n";
},{}],"templates/typescript.ts":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default="\nimport { MongoClient } from 'mongodb';\n\nexport async function up(client: MongoClient) {\n  await client\n    .db()\n    .collection('albums')\n    .updateOne({ artist: 'The Beatles' }, { $set: { blacklisted: true } });\n\n  await client\n    .db()\n    .collection('albums')\n    .updateOne({ artist: 'The Doors' }, { $set: { stars: 5 } });\n}\nexport async function down(client: MongoClient) {\n  await client\n    .db()\n    .collection('albums')\n    .updateOne({ artist: 'The Doors' }, { $set: { stars: 0 } });\n\n  await client\n    .db()\n    .collection('albums')\n    .updateOne({ artist: 'The Beatles' }, { $set: { blacklisted: false } });\n}\n\n";
},{}],"templates/migration.ts":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default="module.exports = async () => {\n  return {\n    changelogCollectionName: 'migrations',\n    migrationsDir: 'migrations',\n    defaultTemplate: 'es6',\n    outDir: './.xmigrate',\n    typescript: true,\n    logger: {\n      folder: './migrations-log',\n      up: {\n        success: 'up.success.log',\n        error: 'up.error.log'\n      },\n      down: {\n        success: 'down.success.log',\n        error: 'down.error.log'\n      }\n    },\n    mongodb: {\n      url: 'mongodb://localhost:27017',\n      databaseName: 'test',\n      options: {\n        useNewUrlParser: true\n      }\n    },\n  };\n};\n";
},{}],"templates/index.ts":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});const t=e(require("./native"));exports.native=t.default;const r=e(require("./es5"));exports.es5=r.default;const s=e(require("./es6"));exports.es6=s.default;const i=e(require("./typescript"));exports.typescript=i.default;const o=e(require("./migration"));exports.migration=o.default;
},{"./native":"templates/native.ts","./es5":"templates/es5.ts","./es6":"templates/es6.ts","./typescript":"templates/typescript.ts","./migration":"templates/migration.ts"}],"helpers/typescript-builder.ts":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=require("child_process");exports.TranspileTypescript=((r,s)=>new Promise((o,t)=>{const p=e.spawn("npx",["gapi","build","--glob",`${r.toString()}`,"--outDir",s]);p.stderr.pipe(process.stderr),p.on("close",e=>o(e))}));
},{}],"services/migrations-resolver/migrations-resolver.service.ts":[function(require,module,exports) {
"use strict";var e,i=this&&this.__decorate||function(e,i,t,r){var n,o=arguments.length,s=o<3?i:null===r?r=Object.getOwnPropertyDescriptor(i,t):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,i,t,r);else for(var c=e.length-1;c>=0;c--)(n=e[c])&&(s=(o<3?n(s):o>3?n(i,t,s):n(i,t))||s);return o>3&&s&&Object.defineProperty(i,t,s),s},t=this&&this.__metadata||function(e,i){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,i)},r=this&&this.__awaiter||function(e,i,t,r){return new(t||(t=Promise))(function(n,o){function s(e){try{a(r.next(e))}catch(i){o(i)}}function c(e){try{a(r.throw(e))}catch(i){o(i)}}function a(e){e.done?n(e.value):new t(function(i){i(e.value)}).then(s,c)}a((r=r.apply(e,i||[])).next())})};Object.defineProperty(exports,"__esModule",{value:!0});const n=require("@rxdi/core"),o=require("fs"),s=require("path"),c=require("util"),a=require("../config/config.service"),l=require("../../helpers/typescript-builder");let u=class{constructor(e){this.configService=e}getFileNames(){return r(this,void 0,void 0,function*(){return(yield c.promisify(o.readdir)(this.configService.config.migrationsDir)).filter(e=>".js"===s.extname(e)||this.isTypescript(e))})}readDir(){return c.promisify(o.readdir)(this.configService.config.outDir)}getDistFileNames(){return r(this,void 0,void 0,function*(){return(yield this.readDir()).filter(e=>".js"===s.extname(e)).map(e=>this.getTsCompiledFilePath(e))})}isTypescript(e){return".ts"===s.extname(e)&&this.configService.config.typescript}loadMigration(e,i){return r(this,void 0,void 0,function*(){let i;return i=this.isTypescript(e)?yield this.loadTsCompiledMigration(e):require("esm")(module)(this.getFilePath(e))})}getFilePath(e){return s.join(process.cwd(),this.configService.config.migrationsDir,e)}getRelativePath(e){return this.getFilePath(e).replace(process.cwd(),"")}clean(e){return r(this,void 0,void 0,function*(){return yield Promise.all(e.map(e=>this.deleteArtefacts(e))),!0})}deleteArtefacts(e){return r(this,void 0,void 0,function*(){yield this.delete(this.getTsCompiledFilePath(e)),yield this.delete(this.getTsCompiledFilePath(`${e}.map`))})}delete(e){return r(this,void 0,void 0,function*(){return new Promise(i=>o.unlink(e,()=>i(!0)))})}loadTsCompiledMigration(e){return r(this,void 0,void 0,function*(){return require(this.getTsCompiledFilePath(e))})}transpileMigrations(e){return r(this,void 0,void 0,function*(){yield l.TranspileTypescript(e.map(e=>this.getRelativePath(e)),this.configService.config.outDir)})}getTsCompiledFilePath(e){return s.join(process.cwd(),this.configService.config.outDir,this.replaceFilenameJsWithTs(e))}replaceFilenameJsWithTs(e){return e.replace("ts","js")}};u=i([n.Injectable(),t("design:paramtypes",["function"==typeof(e=void 0!==a.ConfigService&&a.ConfigService)?e:Object])],u),exports.MigrationsResolver=u;
},{"../config/config.service":"services/config/config.service.ts","../../helpers/typescript-builder":"helpers/typescript-builder.ts"}],"helpers/error.ts":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});class e extends Error{}exports.ErrorMap=e;
},{}],"services/migration/migration.service.ts":[function(require,module,exports) {
"use strict";var e,t,i,r,n=this&&this.__decorate||function(e,t,i,r){var n,o=arguments.length,a=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,r);else for(var l=e.length-1;l>=0;l--)(n=e[l])&&(a=(o<3?n(a):o>3?n(t,i,a):n(t,i))||a);return o>3&&a&&Object.defineProperty(t,i,a),a},o=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},a=this&&this.__awaiter||function(e,t,i,r){return new(i||(i=Promise))(function(n,o){function a(e){try{s(r.next(e))}catch(t){o(t)}}function l(e){try{s(r.throw(e))}catch(t){o(t)}}function s(e){e.done?n(e.value):new i(function(t){t(e.value)}).then(a,l)}s((r=r.apply(e,t||[])).next())})},l=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var i in e)Object.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t.default=e,t},s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});const c=require("../database/database.service"),d=require("@rxdi/core"),f=require("util"),u=require("fs"),g=require("../../helpers/date"),h=l(require("../../templates/index")),m=require("../migrations-resolver/migrations-resolver.service"),p=s(require("chalk")),y=require("path"),v=require("../../helpers/log-factory"),N=require("../../helpers/error"),w=require("../config/config.service");let b=class{constructor(e,t,i,r){this.configService=e,this.database=t,this.migrationsResolver=i,this.logger=r}connect(){return a(this,void 0,void 0,function*(){return yield this.database.mongooseConnect(),this.database.connect()})}up(){return a(this,void 0,void 0,function*(){const e=(yield this.statusInternal()).filter(e=>"PENDING"===e.appliedAt),t=[],i=yield this.connect(),r=this.logger.getUpLogger(),n=e.filter(e=>this.migrationsResolver.isTypescript(e.fileName)).map(e=>e.fileName);n.length&&(yield this.migrationsResolver.transpileMigrations(n));const o=e=>a(this,void 0,void 0,function*(){let n;try{const o=yield this.migrationsResolver.loadMigration(e.fileName);n=yield o.up(i)}catch(c){const i=new N.ErrorMap(c.message);throw i.fileName=e.fileName,i.migrated=t,yield r.error({migrated:t,errorMessage:i.message,fileName:e.fileName}),i}const o=i.db().collection(this.configService.config.changelogCollectionName),{fileName:a}=e,l=new Date;try{yield o.insertOne({fileName:a,appliedAt:l})}catch(c){throw yield r.error({migrated:t,errorMessage:c.message,fileName:e.fileName}),new Error(`Could not update changelog: ${c.message}`)}const s={fileName:e.fileName,appliedAt:l,result:n};return yield r.log(s),t.push(s),yield!0});for(const a of e)yield o(a);return yield this.migrationsResolver.clean(n),this.printStatus(t),t})}down(){return a(this,void 0,void 0,function*(){const e=[],t=(yield this.statusInternal()).filter(e=>"PENDING"!==e.appliedAt),i=t[t.length-1];if(!i)return;const r=this.migrationsResolver.isTypescript(i.fileName);let n;if(t.length&&i){const t=this.logger.getDownLogger(),a=yield this.connect();r&&(yield this.migrationsResolver.transpileMigrations([i.fileName]));try{const r=yield this.migrationsResolver.loadMigration(i.fileName);n=yield r.down(a)}catch(o){const r=new N.ErrorMap(o.message);throw r.fileName=i.fileName,r.downgraded=e,yield t.error({downgraded:e,errorMessage:o.message,fileName:i.fileName}),r}const l=a.db().collection(this.configService.config.changelogCollectionName);try{yield l.deleteOne({fileName:i.fileName});const r={fileName:i.fileName,appliedAt:new Date,result:n};yield t.log(r),e.push(r)}catch(o){throw yield t.error({downgraded:e,errorMessage:o.message,fileName:i.fileName}),new Error(`Could not update changelog: ${o.message}`)}}return i&&(yield this.migrationsResolver.clean([i.fileName])),this.printStatus(e),e})}createWithTemplate(e,t,i={raw:!1,typescript:!1}){return a(this,void 0,void 0,function*(){let r=h[e];if(i.raw)r=e;else if(!r)throw new Error(`🔥  *** Missing template ${e} ***`);const n=i.typescript||"typescript"===e,o=y.normalize(`./${this.configService.config.migrationsDir}/${g.nowAsString()}-${t}.${n?"ts":"js"}`);return yield f.promisify(u.writeFile)(o,r,{encoding:"utf-8"}),"/"+o})}writeConfig(){return a(this,void 0,void 0,function*(){yield f.promisify(u.writeFile)("./xmigrate.js",h.migration,{encoding:"utf-8"})})}init(){return a(this,void 0,void 0,function*(){const e=yield f.promisify(u.readFile)("./.gitignore",{encoding:"utf-8"}),t=u.createWriteStream("./.gitignore",{flags:"a"});e.includes(".cache")||t.write("\n.cache"),e.includes(".xmigrate")||t.write("\n.xmigrate"),t.end(),yield this.writeConfig()})}create({name:e,template:t}){return a(this,void 0,void 0,function*(){const i=t||this.configService.config.defaultTemplate,r=yield this.createWithTemplate(i,e);console.log(`\n\n🚀  ${p.default.bold("Template:")} "${p.default.blue(i)}"!\n\n💾  ${p.default.bold("File:")} ${p.default.blue(y.normalize(`${process.cwd()}//${r}`))}\n\n🚀  ${p.default.green.bold("Migration template created!")}\n`)})}statusInternal(){return a(this,void 0,void 0,function*(){const e=yield this.migrationsResolver.getFileNames(),t=(yield this.connect()).db().collection(this.configService.config.changelogCollectionName),i=yield t.find({}).toArray();return e.map(e=>{const t=i.find(t=>t.fileName===e),r=t?t.appliedAt.toJSON():"PENDING";return{fileName:e,appliedAt:r,result:null}})})}status(){return a(this,void 0,void 0,function*(){const e=yield this.statusInternal();return this.printStatus(e,"table"),{status:!0,result:e.filter(e=>"PENDING"===e.appliedAt)}})}printStatus(e,t){if("table"===t&&e.length)return console.table(e,["fileName","appliedAt"]);e.forEach((e,t)=>console.log(`\n#️⃣  ${p.default.white.bold(String(t+1))}\n${p.default.blue("-".repeat(process.stdout.columns))}\n📁  ${p.default.bold("Filename:")} ${p.default.green(e.fileName)}\n⏱️  ${p.default.bold("Applied at:")} ${p.default.green(String(e.appliedAt))}\n${p.default.blue("-".repeat(process.stdout.columns))}\n    `))}};b=n([d.Injectable(),o("design:paramtypes",["function"==typeof(e=void 0!==w.ConfigService&&w.ConfigService)?e:Object,"function"==typeof(t=void 0!==c.DatabaseService&&c.DatabaseService)?t:Object,"function"==typeof(i=void 0!==m.MigrationsResolver&&m.MigrationsResolver)?i:Object,"function"==typeof(r=void 0!==v.LogFactory&&v.LogFactory)?r:Object])],b),exports.MigrationService=b;
},{"../database/database.service":"services/database/database.service.ts","../../helpers/date":"helpers/date.ts","../../templates/index":"templates/index.ts","../migrations-resolver/migrations-resolver.service":"services/migrations-resolver/migrations-resolver.service.ts","../../helpers/log-factory":"helpers/log-factory.ts","../../helpers/error":"helpers/error.ts","../config/config.service":"services/config/config.service.ts"}],"services/generic-runner/generic-runner.service.ts":[function(require,module,exports) {
"use strict";var e,t,o,r,i=this&&this.__decorate||function(e,t,o,r){var i,n=arguments.length,l=n<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,o):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,o,r);else for(var a=e.length-1;a>=0;a--)(i=e[a])&&(l=(n<3?i(l):n>3?i(t,o,l):i(t,o))||l);return n>3&&l&&Object.defineProperty(t,o,l),l},n=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},l=this&&this.__awaiter||function(e,t,o,r){return new(o||(o=Promise))(function(i,n){function l(e){try{s(r.next(e))}catch(t){n(t)}}function a(e){try{s(r.throw(e))}catch(t){n(t)}}function s(e){e.done?i(e.value):new o(function(t){t(e.value)}).then(l,a)}s((r=r.apply(e,t||[])).next())})},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});const s=require("path"),c=a(require("chalk")),d=require("../../helpers/log-factory"),u=require("@rxdi/core"),g=require("../migration/migration.service"),f=require("../config/config.service"),h=require("../migrations-resolver/migrations-resolver.service");let b=class{constructor(e,t,o,r){this.logger=e,this.configService=t,this.resolver=o,this.migrationService=r,this.tasks=new Map}setTasks(e){this.tasks=new Map(e)}run(e,t){return l(this,void 0,void 0,function*(){if(yield this.logEnvironment(e),!this.tasks.has(e))throw new Error("\n🔥  Missing command");let o;try{const n=yield this.tasks.get(e)(t);n&&n.status&&n.result.length?console.log(`\n          \n🔥  There are ${c.default.red(n.result.length)} migrations with status '${c.default.red("PENDING")}', run '${c.default.green("xmigrate up")}' command!\n          `):console.log(`\n        \n🚀  ${c.default.green.bold(n&&n.length?`Success! Ran ${n.length} migrations.`:"Already up to date")}\n        `),o=!1}catch(r){if(console.error(`\n      \n🔥  ${c.default.bold("Status: Operation executed with error")}\n🧨  ${c.default.bold("Error: "+JSON.stringify(r))}\n📨  ${c.default.bold("Message: "+r.message)}\n      `),t&&t.rollback)try{yield this.rollback(r.fileName)}catch(i){console.error("\n🔥  Migration rollback exited with error  ",i),yield this.logger.getDownLogger().error({errorMessage:i.message,fileName:r.fileName})}o=!0}return o})}rollback(e){return l(this,void 0,void 0,function*(){const t={fileName:e,appliedAt:new Date},o=this.logger.getDownLogger(),{migrationsDir:r}=this.configService.config,i=s.normalize(`${process.cwd()}/${r}/${e}`);let n;return console.log(`\n\n🙏  ${c.default.bold("Status: Executing rollback operation")} ${c.default.red("xmigrate down")}\n📁  ${c.default.bold("Migration:")} ${i}\n      `),n=this.resolver.isTypescript(e)?yield this.resolver.loadTsCompiledMigration(e):require(i),t.result=yield n.down(yield this.migrationService.connect()),t.appliedAt=new Date,console.log(`\n🚀  ${c.default.green("Rollback operation success, nothing changed if written correctly!")}`),yield o.log(t),t})}bind(e){return Array.from(this.tasks.keys()).map(t=>this.tasks.set(t,this.tasks.get(t).bind(e))),this}logEnvironment(e){return l(this,void 0,void 0,function*(){const{mongodb:{databaseName:t},migrationsDir:o,logger:{folder:r},changelogCollectionName:i}=this.configService.config;console.log(`\n    \n🖥️  ${c.default.bold("Database:")} ${c.default.blue.bold(t)}\n    \n💿  ${c.default.bold("DBCollection:")} ${c.default.blue.bold(i)}\n    \n🗄️  ${c.default.bold("LoggerDir:")} ${c.default.blue.bold(r)}\n    \n📁  ${c.default.bold("MigrationsDir:")} ${c.default.blue.bold(o)}\n    \n👷  ${c.default.bold("Script:")} ${c.default.blue.bold(`xmigrate ${e}`)}\n    `)})}};b=i([u.Injectable(),n("design:paramtypes",["function"==typeof(e=void 0!==d.LogFactory&&d.LogFactory)?e:Object,"function"==typeof(t=void 0!==f.ConfigService&&f.ConfigService)?t:Object,"function"==typeof(o=void 0!==h.MigrationsResolver&&h.MigrationsResolver)?o:Object,"function"==typeof(r=void 0!==g.MigrationService&&g.MigrationService)?r:Object])],b),exports.GenericRunner=b;
},{"../../helpers/log-factory":"helpers/log-factory.ts","../migration/migration.service":"services/migration/migration.service.ts","../config/config.service":"services/config/config.service.ts","../migrations-resolver/migrations-resolver.service":"services/migrations-resolver/migrations-resolver.service.ts"}],"helpers/args-extractors.ts":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.includes=(e=>process.argv.toString().includes(e)),exports.nextOrDefault=((e,r=!0,s=(e=>e))=>{if(process.argv.toString().includes(e)){const t=process.argv[process.argv.indexOf(e)+1];return t?t.includes("--")?r:s(t):r}return r});
},{}],"helpers/ensure-folder.ts":[function(require,module,exports) {
"use strict";var t=this&&this.__awaiter||function(t,e,n,i){return new(n||(n=Promise))(function(r,u){function o(t){try{s(i.next(t))}catch(e){u(e)}}function c(t){try{s(i.throw(t))}catch(e){u(e)}}function s(t){t.done?r(t.value):new n(function(e){e(t.value)}).then(o,c)}s((i=i.apply(t,e||[])).next())})};Object.defineProperty(exports,"__esModule",{value:!0});const e=require("util"),n=require("fs");function i(i){return t(this,void 0,void 0,function*(){try{yield e.promisify(n.mkdir)(i,{recursive:!0})}catch(t){}})}exports.ensureDir=i;
},{}],"helpers/index.ts":[function(require,module,exports) {
"use strict";function r(r){for(var e in r)exports.hasOwnProperty(e)||(exports[e]=r[e])}Object.defineProperty(exports,"__esModule",{value:!0}),r(require("./args-extractors")),r(require("./date")),r(require("./ensure-folder")),r(require("./error")),r(require("./log-factory"));
},{"./args-extractors":"helpers/args-extractors.ts","./date":"helpers/date.ts","./ensure-folder":"helpers/ensure-folder.ts","./error":"helpers/error.ts","./log-factory":"helpers/log-factory.ts"}],"migrations.module.ts":[function(require,module,exports) {
"use strict";var e,r=this&&this.__decorate||function(e,r,i,t){var o,n=arguments.length,s=n<3?r:null===t?t=Object.getOwnPropertyDescriptor(r,i):t;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,r,i,t);else for(var c=e.length-1;c>=0;c--)(o=e[c])&&(s=(n<3?o(s):n>3?o(r,i,s):o(r,i))||s);return n>3&&s&&Object.defineProperty(r,i,s),s},i=this&&this.__awaiter||function(e,r,i,t){return new(i||(i=Promise))(function(o,n){function s(e){try{l(t.next(e))}catch(r){n(r)}}function c(e){try{l(t.throw(e))}catch(r){n(r)}}function l(e){e.done?o(e.value):new i(function(r){r(e.value)}).then(s,c)}l((t=t.apply(e,r||[])).next())})};Object.defineProperty(exports,"__esModule",{value:!0});const t=require("@rxdi/core"),o=require("./services/generic-runner/generic-runner.service"),n=require("./helpers/log-factory"),s=require("./injection.tokens"),c=require("./services/migration/migration.service"),l=require("./helpers/args-extractors"),u=require("./default.config"),a=require("./services/config/config.service"),d=require("./helpers"),g=require("util"),p=require("fs"),f=require("./helpers/typescript-builder"),m=require("path"),y=require("./services/migrations-resolver/migrations-resolver.service");let v=e=class{static forRoot(r=u.DEFAULT_CONFIG){return{module:e,providers:[o.GenericRunner,n.LogFactory,a.ConfigService,y.MigrationsResolver,{provide:s.Config,useValue:r},{provide:s.LoggerConfig,useValue:r.logger},{provide:"set-tasks",deps:[o.GenericRunner,c.MigrationService],useFactory:(e,r)=>i(this,void 0,void 0,function*(){const i=[["up",r.up],["down",r.down],["status",r.status],["create",r.create],["init",r.init]];return e.setTasks(i),e.bind(r),i})},{provide:s.CommandInjector,useFactory:()=>{const[,,...e]=process.argv;return{command:e[0],argv:e}}},{provide:"start",deps:[s.CommandInjector,o.GenericRunner,a.ConfigService],useFactory:({command:e,argv:t},o,n)=>i(this,void 0,void 0,function*(){try{let e;const t="xmigrate";if(yield g.promisify(p.exists)(`./${t}.ts`)){const o=yield g.promisify(p.exists)("./.xmigrate/config.temp"),n=e=>i(this,void 0,void 0,function*(){yield f.TranspileTypescript([`/${t}.ts`],r.outDir),console.log("Transpile complete!"),yield g.promisify(p.writeFile)("./.xmigrate/config.temp",e.mtime.toISOString(),{encoding:"utf-8"})}),s=yield g.promisify(p.stat)(`./${t}.ts`);if(o){const e=yield g.promisify(p.readFile)("./.xmigrate/config.temp",{encoding:"utf-8"});new Date(e).toISOString()!==s.mtime.toISOString()&&(console.log("Xmigrate configuration has changed transpiling..."),yield n(s))}else console.log("Transpile xmigrate.ts..."),yield n(s);e=require(m.join(process.cwd(),`./${r.outDir}`,`${t}.js`));try{yield g.promisify(p.unlink)(m.join("./",r.outDir,"xmigrate.js.map"))}catch(c){}}else e=require("esm")(module)(m.join(process.cwd(),`./${t}.js`));e=e.default?yield e.default():yield e(),n.set(e)}catch(c){}let s;if(yield d.ensureDir(n.config.logger.folder),yield d.ensureDir(n.config.migrationsDir),s="create"===e?yield o.run("create",{name:t[1],template:l.nextOrDefault("--template",null)}):"up"===e?yield o.run("up",{rollback:l.includes("--rollback")}):yield o.run(e))return process.exit(1);process.exit(0)})}]}}};v=e=r([t.Module()],v),exports.MigrationsModule=v;
},{"./services/generic-runner/generic-runner.service":"services/generic-runner/generic-runner.service.ts","./helpers/log-factory":"helpers/log-factory.ts","./injection.tokens":"injection.tokens.ts","./services/migration/migration.service":"services/migration/migration.service.ts","./helpers/args-extractors":"helpers/args-extractors.ts","./default.config":"default.config.ts","./services/config/config.service":"services/config/config.service.ts","./helpers":"helpers/index.ts","./helpers/typescript-builder":"helpers/typescript-builder.ts","./services/migrations-resolver/migrations-resolver.service":"services/migrations-resolver/migrations-resolver.service.ts"}],"app.module.ts":[function(require,module,exports) {
"use strict";var e=this&&this.__decorate||function(e,t,r,o){var c,i=arguments.length,l=i<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,r,o);else for(var s=e.length-1;s>=0;s--)(c=e[s])&&(l=(i<3?c(l):i>3?c(t,r,l):c(t,r))||l);return i>3&&l&&Object.defineProperty(t,r,l),l};Object.defineProperty(exports,"__esModule",{value:!0});const t=require("@rxdi/core"),r=require("./migrations.module");let o=class{};o=e([t.Module({imports:[r.MigrationsModule.forRoot()]})],o),exports.AppModule=o;
},{"./migrations.module":"migrations.module.ts"}],"main.ts":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=require("@rxdi/core"),r=require("./app.module");e.Bootstrap(r.AppModule).subscribe(()=>{},console.error.bind(console));
},{"./app.module":"app.module.ts"}]},{},["main.ts"], null)
//# sourceMappingURL=/main.js.map