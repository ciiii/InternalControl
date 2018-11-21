using Dapper;
using MyLib;
using InternalControl.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using static Dapper.SqlMapper;

namespace InternalControl.Infrastucture
{
    /// <summary>
    /// 预定义的主键,就是这个主键名称是固定的而已
    /// </summary>
    public class PredefindedKeyFields
    {
        /// <summary>
        /// 
        /// </summary>
        public int Id { get; set; }
    }

    /// <summary>
    /// 一个Id+一个T的列表的结构,很多sp用,对接口来说,就不需要自定义post的传入类了;
    /// 当然要转换为sp类还是手动来的好;
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class PredefindedIdList<T>
    {
        /// <summary>
        /// 
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public IEnumerable<T> List { get; set; }
    }

    /// <summary>
    /// 类似上面那个
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <typeparam name="TList"></typeparam>
    public class PredefindedModelList<T, TList>
    {
        /// <summary>
        /// 
        /// </summary>
        public T Model { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public IEnumerable<TList> List { get; set; }
    }

    /// <summary>
    /// 用一个Name+一个Object表示一个可执行的SP的数据;
    /// </summary>
    public class PredefindedSPStructure
    {
        /// <summary>
        /// SP的名称
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 参数
        /// </summary>
        public object Parameter { get; set; }
    }


    /// <summary>
    /// GetModelById
    /// 一些预定义的sp的dapper调用
    /// </summary>
    public static class PredefinedSpExtention
    {
        /// <summary>
        /// IList PredefindedSPStructure的AddItem挂载方法;
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="list"></param>
        /// <param name="item"></param>
        /// <returns></returns>
        public static IList<PredefindedSPStructure> AddItem<T>(this IList<PredefindedSPStructure> list, T item)
        {
            list.Add(new PredefindedSPStructure() { Name = typeof(T).Name, Parameter = item });
            return list;
        }

        /// <summary>
        /// 预定义的主键
        /// </summary>
        private const string PredefindedKeyFields = "Id";

        /// <summary>
        /// 把IEnumerable int类型的编号列表,转为PredefindedKeyFieldsList列表,后者可以转为一个dataTable,是只有一个字段 编号 的表
        /// </summary>
        /// <param name="idList"></param>
        /// <returns></returns>
        public static IEnumerable<PredefindedKeyFields> ToPredefindedKeyFieldsList(this IEnumerable<int> idList)
        {
            return idList.Select(i => new PredefindedKeyFields()
            {
                Id = i
            });
        }

        /// <summary>
        /// 根据idlist得到一个用逗号分隔的字符串,count=0则返回"0",其中每一项都是数字;
        /// </summary>
        /// <param name="idList"></param>
        /// <param name="Spacer"></param>
        /// <returns></returns>
        public static string ToStringIdWithSpacer(this IEnumerable<int> idList, string Spacer = ",")
        {
            return idList.Count() == 0 ? "0" : string.Join(Spacer, idList);
        }

        /// <summary>
        /// 通过主键获得对象,或者null
        /// T为表映射而来的类
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="cnn"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        async public static Task<T> GetModelByIdSpAsync<T>(this IDbConnection cnn, int id, string tbName = null)
        {
            var result = await cnn.QuerySpAsync<sp_GetList, T>(new sp_GetList()
            {
                tbName = tbName ?? typeof(T).Name,
                strWhere = $"{PredefindedKeyFields}={id}",
                keyFields = PredefindedKeyFields,
                OrderStr = "",
                tbFields = "*"
            });
            return result.FirstOrDefault();
        }

        /// <summary>
        /// sp_GetList,带搜索条件的
        /// T的作用有2:1默认用T的名称做TbName,2dapper返回类型的指定
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <typeparam name="TFilter"></typeparam>
        /// <param name="cnn"></param>
        /// <param name="filter"></param>
        /// <param name="tbName"></param>
        /// <param name="keyFields"></param>
        /// <param name="orderType"></param>
        /// <param name="orderStr"></param>
        /// <returns></returns>
        async public static Task<IEnumerable<T>> GetListSpAsync<T, TFilter>(
            this IDbConnection cnn,
            TFilter filter = null,
            string tbName = null,
            string keyFields = PredefindedKeyFields,
            bool orderType = false,
            string orderStr = "",
            string tbFields = "*") where TFilter : class
        {
            return await cnn.QuerySpAsync<sp_GetList, T>(new sp_GetList()
            {
                tbName = tbName ?? typeof(T).Name,
                strWhere = filter == null ? "" : SqlWhereMapper.toWhere<TFilter>(filter),
                keyFields = keyFields ?? PredefindedKeyFields,
                OrderType = orderType,
                OrderStr = orderStr,
                tbFields = tbFields
            });
        }

        /// <summary>
        /// 没有搜索条件的单独传参数
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="cnn"></param>
        /// <param name="tbName"></param>
        /// <param name="keyFields"></param>
        /// <param name="orderType"></param>
        /// <param name="orderStr"></param>
        /// <returns></returns>
        async public static Task<IEnumerable<T>> GetListSpAsync<T>(
            this IDbConnection cnn,
            string tbName = null,
            string keyFields = null,
            bool orderType = false,
            string orderStr = "")
        {
            return await cnn.GetListSpAsync<T, object>(null, tbName, keyFields, orderType, orderStr);
        }

        /// <summary>
        /// 有条件的分页获取
        /// T的作用有2:1默认用T的名称做TbName,2dapper返回类型的指定
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <typeparam name="TFilter"></typeparam>
        /// <param name="cnn"></param>
        /// <param name="paging"></param>
        /// <param name="filter"></param>
        /// <param name="tbName"></param>
        /// <param name="keyFields"></param>
        /// <param name="orderStr"></param>
        /// <param name="orderType"></param>
        /// <returns></returns>
        async public static Task<PagingResult<T>> GetPagingListSpAsync<T, TFilter>(
            this IDbConnection cnn,
            Paging paging = null,
            TFilter filter = null,
            string tbName = null,
            string keyFields = null,
            string orderStr = "",
            bool? orderType = null) where TFilter : class
        {
            if (paging == null) paging = new Paging();
            var result = await cnn.QueryMultipleSpAsync(new sp_GetPagingList
            {
                tbName = tbName ?? typeof(T).Name,
                strWhere = filter == null ? "" : SqlWhereMapper.toWhere<TFilter>(filter),
                keyFields = keyFields ?? PredefindedKeyFields,
                PageSize = paging.Size,
                PageIndex = paging.Index,
                OrderType = orderType??paging.OrderType,
                OrderStr = orderStr,
                tbFields = "*"
            });
            var total = result.Read<int>().FirstOrDefault();
            var list = result.Read<T>();
            return new PagingResult<T> { Total = total, List = list };
        }

        /// <summary>
        /// 没有搜索条件的,返回分页数据
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="cnn"></param>
        /// <param name="paging"></param>
        /// <param name="tbName"></param>
        /// <param name="keyFields"></param>
        /// <param name="orderStr"></param>
        /// <returns></returns>
        async public static Task<PagingResult<T>> GetPagingListSpAsync<T>(
            this IDbConnection cnn,
            Paging paging = null,
            string tbName = null,
            string keyFields = null,
            string orderStr = "",
            bool? orderType = null)
        {
            return await cnn.GetPagingListSpAsync<T, object>(paging, null, tbName, keyFields, orderStr, orderType);
        }

        /// <summary>
        /// 异步执行一个sp
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="cnn"></param>
        /// <param name="model">sp映射而来的类对象,不能为null...</param>
        /// <param name="transaction"></param>
        /// <returns></returns>
        public static Task<int> ExecuteSpAsync<T>(this IDbConnection cnn, T model, IDbTransaction transaction = null)
        {
            return cnn.ExecuteAsync(typeof(T).Name, model, transaction, commandType: CommandType.StoredProcedure);
        }

        /// <summary>
        /// 执行一个sp,返回指定类型的list,sp如果没有参数,则不输入model
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <typeparam name="TOut"></typeparam>
        /// <param name="cnn"></param>
        /// <param name="model"></param>
        /// <param name="transaction"></param>
        /// <returns></returns>
        public static Task<IEnumerable<TOut>> QuerySpAsync<T, TOut>(
            this IDbConnection cnn,
            T model = null,
            IDbTransaction transaction = null) where T : class
        {
            return cnn.QueryAsync<TOut>(typeof(T).Name, model, transaction, commandType: CommandType.StoredProcedure);
        }

        /// <summary>
        /// 执行一个sp,返回多个list,需要自己再去解析,
        /// sp如果没有参数,则不输入model
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="cnn"></param>
        /// <param name="model"></param>
        /// <param name="transaction"></param>
        /// <returns></returns>
        public static Task<GridReader> QueryMultipleSpAsync<T>(
            this IDbConnection cnn,
            T model = null,
            IDbTransaction transaction = null) where T : class
        {
            return cnn.QueryMultipleAsync(typeof(T).Name, model, transaction, commandType: CommandType.StoredProcedure);
        }
    }
}
