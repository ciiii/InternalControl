using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MyLib;
using InternalControl.Business;
using InternalControl.Infrastucture;
using InternalControl.Models;
using Microsoft.Extensions.Configuration;

namespace InternalControl.Controllers
{
    /// <summary>
    /// 通知
    /// </summary>
    public class NoticeController : BaseController
    {
        #region 消息通知
        /// <summary>
        /// 通知类型取至字典表"通知类型",只有"任务消息"和"通知消息"两种
        /// 接收者类型:
        /// 0 所有人 该情况下, 接收者编号也 = 0;
        /// 10 -人员;
        /// 20 -部门;
        /// 30 -角色;
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        async public Task AddOrUpdateNotice([FromBody]PredefindedModelList<Notice, NoticeReceivingCondition> data)
        {
            data.Model.SendorId = CurrentUser.Id;

            if (data.Model.Id != 0 && data.Model.SendorId != CurrentUser.Id)
            {
                throw new Exception("只能修改自己发布的通知");
            }

            await Db.ExecuteSpAsync(new SPNoticeMerge()
            {
                List = data.Model.ToDataTable(),
                ListOfNoticeReceivingCondition = data.List.ToDataTable()
            });
        }

        /// <summary>
        /// 启用禁用通知;
        /// </summary>
        /// <param name="data">启用/禁用 + 通知id列表</param>
        /// <returns></returns>
        [HttpPost]
        async public Task SwitchNoctice([FromBody]PredefindedModelList<bool, int> data)
        {
            await Db.ExecuteSpAsync(new SPNoticeSwith()
            {
                IsEnabled = data.Model,
                NoticeIdList = data.List.ToDataTable()
            });
        }

        /// <summary>
        /// 通知管理页面获取到的自己发送的通知列表
        /// </summary>
        /// <param name="paging"></param>
        /// <param name="filter"></param>
        /// <returns></returns>
        [HttpGet]
        async public Task<object> GetPagingNoticeForManageList(Paging paging, NoticeFilter filter)
        {
            //只能管理自己发送的通知
            filter.SendorId = CurrentUser.Id;
            return await Db.GetPagingListSpAsync<VNotice, NoticeFilter>(paging, filter);
        }

        /// <summary>
        /// 分页获取当前登录人可以看到的通知列表,包括了是否已经查看的数据
        /// </summary>
        /// <param name="paging"></param>
        /// <param name="filter"></param>
        /// <returns></returns>
        [HttpGet]
        async public Task<object> GetPagingNotcieForViewList(Paging paging, NoticeFilter filter)
        {
            return await Db.GetPagingListSpAsync<VTFNNoticeCanView, NoticeFilter>(paging, filter, $"TFNNoticeCanView({CurrentUser.Id})");
        }

        /// <summary>
        /// 获取通知详情;
        /// </summary>
        /// <param name="NoticeId"></param>
        /// <returns></returns>
        async public Task<object> GetNoticeDetail(int NoticeId)
        {
            return new
            {
                Notice = Db.GetModelByIdSpAsync<VNotice>(NoticeId),
                NoticeReceivingCondition = await Db.GetListSpAsync<VNoticeReceivingCondition, NoticeReceivingConditionFilter>(
                    new NoticeReceivingConditionFilter()
                    {
                        NoticeId = NoticeId
                    })
            };
        }
        #endregion

        #region 任务通知

        /// <summary>
        /// 任务通知
        /// </summary>
        /// <param name="paging"></param>
        /// <returns></returns>
        [HttpGet]
        async public Task<object> GetPagingProjectBacklog(Paging paging)
        {
            return await Db.GetPagingListSpAsync<VTFNProjectBacklog>(paging, $"TFNProjectBacklog({CurrentUser.Id})");
        }
        #endregion

        /// <summary>
        /// 
        /// </summary>
        /// <param name="paging"></param>
        /// <returns></returns>
        #region 任务预警
        [HttpGet]
        async public Task<object> GetPagingExecuteProjectWithDayDiffOfEarlyWarning(Paging paging)
        {
            return await Db.GetPagingListSpAsync<object>(paging, $"TFNExecuteProjectWithDayDiffOfEarlyWarning({CurrentUser.Id})");
        }
        #endregion
    }
}