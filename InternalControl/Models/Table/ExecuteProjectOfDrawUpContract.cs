using System;
using System.Data;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace InternalControl.Models
{
    /// <summary>
    /// ExecuteProjectOfDrawUpContract[拟定合同类]
    /// </summary>
    [Serializable]
	public partial class ExecuteProjectOfDrawUpContract 
	{       
        #region 属性
        /// <summary>
		/// 包Id
		/// </summary>
        [DisplayName("包Id")]
        [Required(ErrorMessage ="请提供[Id]")]
		public int Id { get; set; }
        /// <summary>
		/// 合同类型
		/// </summary>
        [DisplayName("合同类型")]
        [Required(ErrorMessage ="请提供[TypeOfContract]")]
        [MaxLength(50,ErrorMessage ="TypeOfContract不能超过[25]字")]
		public string TypeOfContract { get; set; }
        /// <summary>
		/// 律师审核意见表
		/// </summary>
        [DisplayName("律师审核意见表")]
        [Required(ErrorMessage ="请提供[LawyersOpinionSheet]")]
        [MaxLength(200,ErrorMessage ="LawyersOpinionSheet不能超过[100]字")]
		public string LawyersOpinionSheet { get; set; }
        /// <summary>
		/// 校内会签记录表
		/// </summary>
        [DisplayName("校内会签记录表")]
        [Required(ErrorMessage ="请提供[SchoolCountersignedRecordForm]")]
        [MaxLength(200,ErrorMessage ="SchoolCountersignedRecordForm不能超过[100]字")]
		public string SchoolCountersignedRecordForm { get; set; }
        /// <summary>
		/// 合同审定稿
		/// </summary>
        [DisplayName("合同审定稿")]
        [Required(ErrorMessage ="请提供[ContractApproval]")]
        [MaxLength(200,ErrorMessage ="ContractApproval不能超过[100]字")]
		public string ContractApproval { get; set; }
        
        
        #endregion
	}
}