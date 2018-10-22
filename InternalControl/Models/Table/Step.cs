using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// Step[步骤   状态:默认0,操作后由操作的状态值填写,具体对应stempTemplateState里面的State值      当前步骤的状态用了"步骤模板编号+状态编号+排序"来说明   虽然可以用"步骤模板状态"id来指定,但变换其状态来比较麻烦;类]
    /// </summary>
    [Serializable]
	public partial class Step 
	{       
        #region 属性
        /// <summary>
		/// 自增编号
		/// </summary>
        [DisplayName("自增编号")]
        [Required(ErrorMessage ="请提供[Id]")]
		public int Id { get; set; }
        /// <summary>
		/// 流程编号
		/// </summary>
        [DisplayName("流程编号")]
        [Required(ErrorMessage ="请提供[FlowId]")]
		public int FlowId { get; set; }
        /// <summary>
		/// 步骤模板编号
		/// </summary>
        [DisplayName("步骤模板编号")]
        [Required(ErrorMessage ="请提供[StepTemplateId]")]
		public int StepTemplateId { get; set; }
        /// <summary>
		/// 状态
		/// </summary>
        [DisplayName("状态")]
        [Required(ErrorMessage ="请提供[State]")]
		public int State { get; set; }
        /// <summary>
		/// 执行人编号
		/// </summary>
        [DisplayName("执行人编号")]
		public int? OperatorId { get; set; }
        /// <summary>
		/// 执行时间
		/// </summary>
        [DisplayName("执行时间")]
		public DateTime? OperatorDatetime { get; set; }
        /// <summary>
		/// 建立时间
		/// </summary>
        [DisplayName("建立时间")]
        [Required(ErrorMessage ="请提供[CreateDatetime]")]
		public DateTime? CreateDatetime { get; set; }
        /// <summary>
		/// 备注
		/// </summary>
        [DisplayName("备注")]
        [MaxLength(1000,ErrorMessage ="Remark不能超过[500]字")]
		public string Remark { get; set; }
        
        
        #endregion
	}
}