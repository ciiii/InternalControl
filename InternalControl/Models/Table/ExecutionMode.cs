using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// ExecutionMode[执行方式,独立出来,类]
    /// </summary>
    [Serializable]
	public partial class ExecutionMode 
	{       
        #region 属性
        /// <summary>
		/// Id
		/// </summary>
        [DisplayName("Id")]
        [Required(ErrorMessage ="请提供[Id]")]
		public int Id { get; set; }
        /// <summary>
		/// 自主采购这些
		/// </summary>
        [DisplayName("自主采购这些")]
        [Required(ErrorMessage ="请提供[Name]")]
        [MaxLength(100,ErrorMessage ="Name不能超过[50]字")]
		public string Name { get; set; }
        /// <summary>
		/// 备注
		/// </summary>
        [DisplayName("备注")]
        [MaxLength(1000,ErrorMessage ="Remark不能超过[500]字")]
		public string Remark { get; set; }
        
        
        #endregion
	}
}