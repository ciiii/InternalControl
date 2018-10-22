using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// Setting[各种唯一设置,这个随时可能变;类]
    /// </summary>
    [Serializable]
	public partial class Setting 
	{       
        #region 属性
        /// <summary>
		/// 
		/// </summary>
        [Required(ErrorMessage ="请提供[Id]")]
		public int Id { get; set; }
        /// <summary>
		/// 单位名称
		/// </summary>
        [DisplayName("单位名称")]
        [Required(ErrorMessage ="请提供[CompanyName]")]
        [MaxLength(200,ErrorMessage ="CompanyName不能超过[100]字")]
		public string CompanyName { get; set; }
        /// <summary>
		/// 单位地址
		/// </summary>
        [DisplayName("单位地址")]
        [Required(ErrorMessage ="请提供[CompanyAddress]")]
        [MaxLength(200,ErrorMessage ="CompanyAddress不能超过[100]字")]
		public string CompanyAddress { get; set; }
        /// <summary>
		/// 执行项目编号的前缀
		/// </summary>
        [DisplayName("执行项目编号的前缀")]
        [MaxLength(50,ErrorMessage ="PreFixOfExecuteProjectNumber不能超过[25]字")]
		public string PreFixOfExecuteProjectNumber { get; set; }
        
        
        #endregion
	}
}