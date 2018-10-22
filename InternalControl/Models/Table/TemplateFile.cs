using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// TemplateFile[模板文件类]
    /// </summary>
    [Serializable]
	public partial class TemplateFile 
	{       
        #region 属性
        /// <summary>
		/// 编号
		/// </summary>
        [DisplayName("编号")]
        [Required(ErrorMessage ="请提供[Id]")]
		public int Id { get; set; }
        /// <summary>
		/// 名称
		/// </summary>
        [DisplayName("名称")]
        [MaxLength(200,ErrorMessage ="Name不能超过[100]字")]
		public string Name { get; set; }
        /// <summary>
		/// 
		/// </summary>
        [MaxLength(200,ErrorMessage ="FileName不能超过[100]字")]
		public string FileName { get; set; }
        /// <summary>
		/// 
		/// </summary>
        [Required(ErrorMessage ="请提供[Type]")]
        [MaxLength(200,ErrorMessage ="Type不能超过[100]字")]
		public string Type { get; set; }
        /// <summary>
		/// 路径
		/// </summary>
        [DisplayName("路径")]
        [MaxLength(200,ErrorMessage ="Url不能超过[100]字")]
		public string Url { get; set; }
        /// <summary>
		/// 备注
		/// </summary>
        [DisplayName("备注")]
        [MaxLength(1000,ErrorMessage ="Remark不能超过[500]字")]
		public string Remark { get; set; }
        
        
        #endregion
	}
}