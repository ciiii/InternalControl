using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// StepTemplate[步骤模板   编号=流程模板编号的,为该流程模板的第一步骤   比如流程模板为100,那么步骤为100的就是该流程的第一步,   步骤模板的编号规则为:   100  -第一步   101 -做第二步类]
    /// </summary>
    [Serializable]
	public partial class StepTemplate 
	{       
        #region 属性
        /// <summary>
		/// 编号
		/// </summary>
        [DisplayName("编号")]
        [Required(ErrorMessage ="请提供[Id]")]
		public int Id { get; set; }
        /// <summary>
		/// 流程模板编号
		/// </summary>
        [DisplayName("流程模板编号")]
        [Required(ErrorMessage ="请提供[FlowTemplateId]")]
		public int FlowTemplateId { get; set; }
        /// <summary>
		/// 步骤名称
		/// </summary>
        [DisplayName("步骤名称")]
        [Required(ErrorMessage ="请提供[Name]")]
        [MaxLength(100,ErrorMessage ="Name不能超过[50]字")]
		public string Name { get; set; }
        /// <summary>
		/// 查看组件名称
		/// </summary>
        [DisplayName("查看组件名称")]
        [MaxLength(100,ErrorMessage ="ViewComponentName不能超过[50]字")]
		public string ViewComponentName { get; set; }
        /// <summary>
		/// 编辑组件名称
		/// </summary>
        [DisplayName("编辑组件名称")]
        [MaxLength(100,ErrorMessage ="EditComponentName不能超过[50]字")]
		public string EditComponentName { get; set; }
        /// <summary>
		/// 样式
		/// </summary>
        [DisplayName("样式")]
        [MaxLength(100,ErrorMessage ="Style不能超过[50]字")]
		public string Style { get; set; }
        /// <summary>
		/// 备注
		/// </summary>
        [DisplayName("备注")]
        [MaxLength(1000,ErrorMessage ="Remark不能超过[500]字")]
		public string Remark { get; set; }
        
        
        #endregion
	}
}