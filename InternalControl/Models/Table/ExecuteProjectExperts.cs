using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// ExecuteProjectExperts[370 专家抽取   这步有点特殊的是一对多的;类]
    /// </summary>
    [Serializable]
	public partial class ExecuteProjectExperts 
	{       
        #region 属性
        /// <summary>
		/// 编号
		/// </summary>
        [DisplayName("编号")]
        [Required(ErrorMessage ="请提供[Id]")]
		public int Id { get; set; }
        /// <summary>
		/// 执行项目编号
		/// </summary>
        [DisplayName("执行项目编号")]
        [Required(ErrorMessage ="请提供[ExecuteProjectId]")]
		public int ExecuteProjectId { get; set; }
        /// <summary>
		/// 专家编号
		/// </summary>
        [DisplayName("专家编号")]
        [Required(ErrorMessage ="请提供[ExpertId]")]
		public int ExpertId { get; set; }
        /// <summary>
		/// 是否备用
		/// </summary>
        [DisplayName("是否备用")]
        [Required(ErrorMessage ="请提供[IsBackup]")]
		public int IsBackup { get; set; }
        
        
        #endregion
	}
}