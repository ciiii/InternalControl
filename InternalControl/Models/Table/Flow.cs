using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// Flow[流程      状态有: 0-未完成;1-已完成;-2 被终止;-3 已过期   保留-1是为了和步骤类型状态匹配,-1在步骤类型状态里面为退回到某一个类]
    /// </summary>
    [Serializable]
	public partial class Flow 
	{       
        #region 属性
        /// <summary>
		/// 自增编号
		/// </summary>
        [DisplayName("自增编号")]
        [Required(ErrorMessage ="请提供[Id]")]
		public int Id { get; set; }
        /// <summary>
		/// 流程模板编号,可以理解为sourceType
		/// </summary>
        [DisplayName("流程模板编号,可以理解为sourceType")]
        [Required(ErrorMessage ="请提供[FlowTemplateId]")]
		public int FlowTemplateId { get; set; }
        /// <summary>
		/// 相关工作对象的id
		/// </summary>
        [DisplayName("相关工作对象的id")]
        [Required(ErrorMessage ="请提供[SourceId]")]
		public int SourceId { get; set; }
        /// <summary>
		/// 状态
		/// </summary>
        [DisplayName("状态")]
        [Required(ErrorMessage ="请提供[State]")]
		public int State { get; set; }
        /// <summary>
		/// 此流程的发起人编号
		/// </summary>
        [DisplayName("此流程的发起人编号")]
        [Required(ErrorMessage ="请提供[CreatorId]")]
		public int CreatorId { get; set; }
        /// <summary>
		/// 建立时间
		/// </summary>
        [DisplayName("建立时间")]
        [Required(ErrorMessage ="请提供[CreateDateTime]")]
		public DateTime? CreateDateTime { get; set; }
        /// <summary>
		/// 备注
		/// </summary>
        [DisplayName("备注")]
        [MaxLength(1000,ErrorMessage ="Remark不能超过[500]字")]
		public string Remark { get; set; }
        
        
        #endregion
	}
}