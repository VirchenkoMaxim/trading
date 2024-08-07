const { createContainer, Lifetime, InjectionMode } = require('awilix')
const { join } = require('path')

const dependencies = [
  join(__dirname, './domains/*/*.controller.js'),
  join(__dirname, './domains/*/*.filter.js'),
  join(__dirname, './domains/*/*.service.js'),
  join(__dirname, './domains/*/*.repository.js'),
  join(__dirname, './domains/*/*.provider.js'),
]

const container = createContainer()

container.loadModules(dependencies, {
  formatName: 'camelCase',
  resolverOptions: {
    lifetime: Lifetime.SINGLETON,
    injectionMode: InjectionMode.CLASSIC,
  },
})

/** lazy load to prevent circular dependency (inspire by https://docs.nestjs.com/fundamentals/module-ref) */
const addModuleRef = (container) => {
  Object.keys(container.registrations).map((name) => {
    const module = container.resolve(name)
    if (module._onModuleInit) module._onModuleInit(container)
    return undefined
  })
}

addModuleRef(container)

exports.container = container
