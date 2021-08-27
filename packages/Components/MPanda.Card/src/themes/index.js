const modulesFiles = require.context('./templates', true, /.vue$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/(.*\/)*([^.]+).*/ig, '$2').toLowerCase()
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
},{})
var templates = modules
var renameTemplate = {}
var TEMPLATE_ENUM=[]
for (let name in templates) { 
  renameTemplate['card-' + name] = templates[name]
  TEMPLATE_ENUM.push(name)
}
export default renameTemplate
export {TEMPLATE_ENUM}