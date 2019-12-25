/**
 * @apiDefine pagination 分页参数
 * @apiParam {Integer} [page=1] (query参数)分页参数: 第几页
 * @apiParam {Integer} [pageSize=10] (query参数)分页参数: 分页大小
 * @apiParam {String} [sort="id"] (query参数)分页参数: 按哪个字段排序
 * @apiParam {String="asc","desc"} [sortDirection="asc"] (query参数)分页参数: 升序还是降序
 */

/**
 * @apiDefine pageResult 分页响应
 * @apiSuccess {Integer} count 总数
 * @apiSuccess {Object[]} rows 结果集
 */

function extendModel (model) {
  model.destroyById = async (id, {transaction}) => {
    let options = { where: { id: id }, transaction }
    return model.destroy(options)
  }

  model.updateById = async (id, data) => {
    let options = { where: { id: id } }
    return model.update(data, options)
  }

  model.updateAndReturn = async (data, options) => {
    let { where, transaction } = options
    await model.update(data, options)
    return model.find({ where, transaction })
  }

  model.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());
  
    delete values.password
    return values
  }
}
  
module.exports = {
  extendModel
}