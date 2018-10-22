using System;
using System.Data;
using System.ComponentModel;

namespace InternalControl.Models
{
    /// <summary>
    /// VTFNProjectBacklog[类]
    /// </summary>
    [Serializable]
	public partial class VTFNProjectBacklog 
	{       
              
        #region 属性
        /// <summary>
		/// 
		/// </summary>
		//public string Message { get; set; }
        public string Message { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string ProjectName { get; set; }
        public string ProjectName { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int Id { get; set; }
        public int Id { get; set; }
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
		//public int SourceId { get; set; }
        public int SourceId { get; set; }
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
		//public int CreatorId { get; set; }
        public int CreatorId { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string CreatorWorkNumber { get; set; }
        public string CreatorWorkNumber { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string CreatorPhone { get; set; }
        public string CreatorPhone { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string CreatorName { get; set; }
        public string CreatorName { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int CreatorDpartmentId { get; set; }
        public int? CreatorDpartmentId { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string CreatorDepartmentName { get; set; }
        public string CreatorDepartmentName { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public DateTime CreateDateTime { get; set; }
        public DateTime CreateDateTime { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string Remark { get; set; }
        public string Remark { get; set; }
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