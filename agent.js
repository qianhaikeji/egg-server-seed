
module.exports = agent => {
  agent.messenger.on('egg-ready', () => {
    agent.messenger.sendRandom('start-init-service')
  });
};