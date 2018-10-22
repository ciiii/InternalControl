using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// ExecuteProjectOfGetRunMode[310 执行方式类]
    /// </summary>
    [Serializable]
	public partial class ExecuteProjectOfGetRunMode 
	{       
        #region 属性
        /// <summary>
		/// Id
		/// </summary>
        [DisplayName("Id")]
        [Required(ErrorMessage ="请提供[Id]")]
		public int Id { get; set; }
        /// <summary>
		/// 执行方式id
		/// </summary>
        [DisplayName("执行方式id")]
        [Required(ErrorMessage ="请提供[ExecutionModeId]")]
		public int ExecutionModeId { get; set; }
        /// <summary>
		/// 代理机构id,部门中的一个
		/// </summary>
        [DisplayName("代理机构id,部门中的一个")]
		public int? AgencyId { get; set; }
        /// <summary>
		/// CreatorId
		/// </summary>
        [DisplayName("CreatorId")]
        [Required(ErrorMessage ="请提供[CreatorId]")]
		public int CreatorId { get; set; }
        /// <summary>
		/// CreateDatetime
		/// </summary>
        [DisplayName("CreateDatetime")]
        [Required(ErrorMessage ="请提供[CreateDatetime]")]
		public DateTime? CreateDatetime { get; set; }
        /// <summary>
		/// 备注
		/// </summary>
        [DisplayName("备注")]
        [MaxLength(1000,ErrorMessage ="Remark不能超过[500]字")]
		public string Remark { get; set; }
        
        
        #endregion
	}
}