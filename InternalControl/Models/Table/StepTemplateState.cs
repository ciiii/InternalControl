using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// StepTemplateState[步骤模板中的某一步骤模板的状态   某个具体的步骤模板,可以有多种状态;   新生成一个步骤时,状态为0,比如提交一个请假到审核步骤,这个状态叫"待审核"   又比如审核步骤时,可以有"通过"和"不通过操作"      其中约定,1为进入下一步或者完成整个流程,-1为退回第一步,-2为终止整个流程;      主键:步骤模板编号+状态编号   编号:101(步骤模板编号) 1(状态编号) 则此状态为1011,   如果状态编号是-1,则整个编号为-      状态说明,如:   审核步骤中:   0:待审核   1:审核通过   -1:审核不通过类]
    /// </summary>
    [Serializable]
	public partial class StepTemplateState 
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
		/// 操作编号
		/// </summary>
        [DisplayName("操作编号")]
        [Required(ErrorMessage ="请提供[State]")]
		public int State { get; set; }
        /// <summary>
		/// 状态说明
		/// </summary>
        [DisplayName("状态说明")]
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