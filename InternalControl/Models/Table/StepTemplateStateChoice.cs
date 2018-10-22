using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// StepTemplateStateChoice[一个审核步骤的通过选择有多种可能的走向;   state=0的没有下一步   最后一步也应该没有下一步   这个Sort其实就是不同的choice   编号: 步骤模板编号+状态编号+sort   10111这样的类]
    /// </summary>
    [Serializable]
	public partial class StepTemplateStateChoice 
	{       
        #region 属性
        /// <summary>
		/// 编号
		/// </summary>
        [DisplayName("编号")]
        [Required(ErrorMessage ="请提供[Id]")]
		public int Id { get; set; }
        /// <summary>
		/// 选择名称
		/// </summary>
        [DisplayName("选择名称")]
        [Required(ErrorMessage ="请提供[Name]")]
        [MaxLength(100,ErrorMessage ="Name不能超过[50]字")]
		public string Name { get; set; }
        /// <summary>
		/// 步骤状态编号
		/// </summary>
        [DisplayName("步骤状态编号")]
        [Required(ErrorMessage ="请提供[StepTemplateStateId]")]
		public int StepTemplateStateId { get; set; }
        /// <summary>
		/// 下一步骤模板编号
		/// </summary>
        [DisplayName("下一步骤模板编号")]
        [Required(ErrorMessage ="请提供[NextStepTemplateId]")]
		public int NextStepTemplateId { get; set; }
        /// <summary>
		/// 排序
		/// </summary>
        [DisplayName("排序")]
        [Required(ErrorMessage ="请提供[Sort]")]
		public int Sort { get; set; }
        /// <summary>
		/// 备注
		/// </summary>
        [DisplayName("备注")]
        [MaxLength(1000,ErrorMessage ="Remark不能超过[500]字")]
		public string Remark { get; set; }
        
        
        #endregion
	}
}