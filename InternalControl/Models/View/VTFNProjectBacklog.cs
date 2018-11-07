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
        public string Message { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string ProjectName { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int Id { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int FlowTemplateId { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string FlowTemplateName { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string FlowTemplateComponentName { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int SourceId { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int State { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string StateName { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int CreatorId { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string CreatorWorkNumber { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string CreatorPhone { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string CreatorName { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int? CreatorDpartmentId { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string CreatorDepartmentName { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public DateTime CreateDateTime { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string Remark { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int? LastStepId { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int? LastStepTemplateId { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string LastStepTemplateName { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string LastViewStepComponentName { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string LastEditStepComponentName { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string LastStepTemplateStyle { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public int? LastStepState { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public string LastStepStateName { get; set; }
        /// <summary>
		/// 
		/// </summary>
        public bool? IsCanOperate { get; set; }
        
          
        #endregion
	}
}