using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// RelevantDepartmentsSetting[归口部门的扩展设置   申报开始/结束时间,可以用setting中的默认月-日来初始化;类]
    /// </summary>
    [Serializable]
	public partial class RelevantDepartmentsSetting 
	{       
        #region 属性
        /// <summary>
		/// 归口部门编号
		/// </summary>
        [DisplayName("归口部门编号")]
        [Required(ErrorMessage ="请提供[Id]")]
		public int Id { get; set; }
        /// <summary>
		/// 能否提交今年的预算能否提交今年的预算
		/// </summary>
        [DisplayName("能否提交今年的预算能否提交今年的预算")]
        [Required(ErrorMessage ="请提供[IsCanChooseThisYear]")]
		public bool IsCanChooseThisYear { get; set; }
        /// <summary>
		/// (到明年预算)申报开始时间
		/// </summary>
        [DisplayName("(到明年预算)申报开始时间")]
        [Required(ErrorMessage ="请提供[DeclareBeginDatetime]")]
		public DateTime? DeclareBeginDatetime { get; set; }
        /// <summary>
		/// 申报结束时间
		/// </summary>
        [DisplayName("申报结束时间")]
        [Required(ErrorMessage ="请提供[DeclareEndDatetime]")]
		public DateTime? DeclareEndDatetime { get; set; }
        /// <summary>
		/// (今年)补充申报开始时间
		/// </summary>
        [DisplayName("(今年)补充申报开始时间")]
		public DateTime? SupplementBeginDatetime { get; set; }
        /// <summary>
		/// (今年)补充申报结束时间
		/// </summary>
        [DisplayName("(今年)补充申报结束时间")]
		public DateTime? SupplementEndDatetime { get; set; }
        /// <summary>
		/// 备注
		/// </summary>
        [DisplayName("备注")]
        [MaxLength(1000,ErrorMessage ="Remark不能超过[500]字")]
		public string Remark { get; set; }
        
        
        #endregion
	}
}