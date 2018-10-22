using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// StepTemplateStateChoiceCondition[进入哪个步骤模板状态的准入条件      一个StepTemplateState 可能没有 StepTemplateStateConditions;          则示这个状态的转变,没有准入条件,      也可能一或多条;         则示这个状态的转变,有这样那样的准入条件         只有"相关数据"满足了所有这些准入条件,这个转变才是有效的;      总的来看:一个审核通过的后续步骤可能是多个,但他们的操作状态其实是一样的都是0->1;   那么在StepTemplateState里面选取哪个,就看着多个StepTemplateState各自对应的准入条件是否能被满足;   可能剩下一个或多个满足的StepTemplateState,那么取第一个中的NextStepTemplateId,      此为多入多出的关键;没有主键哈;   类]
    /// </summary>
    [Serializable]
	public partial class StepTemplateStateChoiceCondition 
	{       
        #region 属性
        /// <summary>
		/// 步骤模板状态选择编号
		/// </summary>
        [DisplayName("步骤模板状态选择编号")]
        [Required(ErrorMessage ="请提供[StepTemplateStateChoiceId]")]
		public int StepTemplateStateChoiceId { get; set; }
        /// <summary>
		/// 属性名称
		/// </summary>
        [DisplayName("属性名称")]
        [Required(ErrorMessage ="请提供[PropName]")]
        [MaxLength(100,ErrorMessage ="PropName不能超过[50]字")]
		public string PropName { get; set; }
        /// <summary>
		/// 运算符
		/// </summary>
        [DisplayName("运算符")]
        [Required(ErrorMessage ="请提供[Operator]")]
        [MaxLength(100,ErrorMessage ="Operator不能超过[50]字")]
		public string Operator { get; set; }
        /// <summary>
		/// 预定义的值
		/// </summary>
        [DisplayName("预定义的值")]
        [Required(ErrorMessage ="请提供[Value]")]
        [MaxLength(100,ErrorMessage ="Value不能超过[50]字")]
		public string Value { get; set; }
        /// <summary>
		/// 备注
		/// </summary>
        [DisplayName("备注")]
        [MaxLength(1000,ErrorMessage ="Remark不能超过[500]字")]
		public string Remark { get; set; }
        
        
        #endregion
	}
}