using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// StepTemplateRole[步骤角色   可以执行该步骤模板的角色,   =0指的是流程中的创建人(负责人)类]
    /// </summary>
    [Serializable]
	public partial class StepTemplateRole 
	{       
        #region 属性
        /// <summary>
		/// 编号
		/// </summary>
        [DisplayName("编号")]
        [Required(ErrorMessage ="请提供[Id]")]
		public int Id { get; set; }
        /// <summary>
		/// 步骤模板编号
		/// </summary>
        [DisplayName("步骤模板编号")]
        [Required(ErrorMessage ="请提供[StepTemplateId]")]
		public int StepTemplateId { get; set; }
        /// <summary>
		/// 角色编号
		/// </summary>
        [DisplayName("角色编号")]
        [Required(ErrorMessage ="请提供[RoleId]")]
		public int RoleId { get; set; }
        
        
        #endregion
	}
}