using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// PackageOfExcuteBudget[220 执行预算      然后现在按你的意思,在预算执行时:   集采货物只能调整数量;   集采服务和非集采只能调整这个包的总的预算?   类]
    /// </summary>
    [Serializable]
	public partial class PackageOfExcuteBudget 
	{       
        #region 属性
        /// <summary>
		/// Id
		/// </summary>
        [DisplayName("Id")]
        [Required(ErrorMessage ="请提供[Id]")]
		public int Id { get; set; }
        /// <summary>
		/// 论证技术要求
		/// </summary>
        [DisplayName("论证技术要求")]
		public string ExecuteTechnicalRequirements { get; set; }
        /// <summary>
		/// 包号
		/// </summary>
        [DisplayName("包号")]
		public int? SerialNumber { get; set; }
        /// <summary>
		/// 执行数量
		/// </summary>
        [DisplayName("执行数量")]
        [Required(ErrorMessage ="请提供[ExecuteNumber]")]
		public int ExecuteNumber { get; set; }
        /// <summary>
		/// 执行单价
		/// </summary>
        [DisplayName("执行单价")]
        [Required(ErrorMessage ="请提供[ExecuteUnitPrice]")]
		public int ExecuteUnitPrice { get; set; }
        /// <summary>
		/// Remark
		/// </summary>
        [DisplayName("Remark")]
        [MaxLength(100,ErrorMessage ="Attachment不能超过[50]字")]
		public string Attachment { get; set; }
        /// <summary>
		/// 附件
		/// </summary>
        [DisplayName("附件")]
        [MaxLength(1000,ErrorMessage ="Remark不能超过[500]字")]
		public string Remark { get; set; }
        
        
        #endregion
	}
}