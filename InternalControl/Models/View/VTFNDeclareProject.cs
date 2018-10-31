using System;
using System.Data;
using System.ComponentModel;

namespace InternalControl.Models
{
    /// <summary>
    /// VTFNDeclareProject[类]
    /// </summary>
    [Serializable]
	public partial class VTFNDeclareProject 
	{       
              
        #region 属性
        /// <summary>
		/// 
		/// </summary>
		//public int Id { get; set; }
        public int Id { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int Year { get; set; }
        public int Year { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string Name { get; set; }
        public string Name { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string ProjectType { get; set; }
        public string ProjectType { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int RelevantDepartmentId { get; set; }
        public int RelevantDepartmentId { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string RelevantDepartmentName { get; set; }
        public string RelevantDepartmentName { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string LinkmanName { get; set; }
        public string LinkmanName { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string LinkmanPhone { get; set; }
        public string LinkmanPhone { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public bool IsCenterPurchase { get; set; }
        public bool IsCenterPurchase { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string PlanPurchaseMethod { get; set; }
        public string PlanPurchaseMethod { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public DateTime DateOfPlanToImplement { get; set; }
        public DateTime DateOfPlanToImplement { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string Reason { get; set; }
        public string Reason { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string Attachment { get; set; }
        public string Attachment { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int CreatorId { get; set; }
        public int CreatorId { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string CreatorName { get; set; }
        public string CreatorName { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int DeclareDepartmentId { get; set; }
        public int? DeclareDepartmentId { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string DeclareDepartmentName { get; set; }
        public string DeclareDepartmentName { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public DateTime CreateDatetime { get; set; }
        public DateTime? CreateDatetime { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string Remark { get; set; }
        public string Remark { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int TotalDeclareAmount { get; set; }
        public int? TotalDeclareAmount { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int FlowTemplateId { get; set; }
        public int FlowTemplateId { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string FlowTemplateName { get; set; }
        public string FlowTemplateName { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string FlowTemplateComponentName { get; set; }
        public string FlowTemplateComponentName { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int State { get; set; }
        public int State { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string StateName { get; set; }
        public string StateName { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int LastStepId { get; set; }
        public int? LastStepId { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int LastStepTemplateId { get; set; }
        public int? LastStepTemplateId { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string LastStepTemplateName { get; set; }
        public string LastStepTemplateName { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string LastViewStepComponentName { get; set; }
        public string LastViewStepComponentName { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string LastEditStepComponentName { get; set; }
        public string LastEditStepComponentName { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string LastStepTemplateStyle { get; set; }
        public string LastStepTemplateStyle { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int LastStepState { get; set; }
        public int? LastStepState { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string LastStepStateName { get; set; }
        public string LastStepStateName { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public bool IsCanOperate { get; set; }
        public bool? IsCanOperate { get; set; }
        
          
        #endregion
	}
}