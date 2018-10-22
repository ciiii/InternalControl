using System;
using System.Data;
using System.ComponentModel;

namespace InternalControl.Models
{
    /// <summary>
    /// VStep[类]
    /// </summary>
    [Serializable]
	public partial class VStep 
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
		//public int FlowTemplateId { get; set; }
        public int FlowTemplateId { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int FlowId { get; set; }
        public int FlowId { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int StepTemplateId { get; set; }
        public int StepTemplateId { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string StepTemplateName { get; set; }
        public string StepTemplateName { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string VIewComponentName { get; set; }
        public string VIewComponentName { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string EditComponentName { get; set; }
        public string EditComponentName { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string Style { get; set; }
        public string Style { get; set; }
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
		//public int OperatorId { get; set; }
        public int? OperatorId { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string OperatorWorkNumber { get; set; }
        public string OperatorWorkNumber { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string OperatorPhone { get; set; }
        public string OperatorPhone { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string OperatorName { get; set; }
        public string OperatorName { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int OperatorDpartmentId { get; set; }
        public int? OperatorDpartmentId { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string OperatorDepartmentName { get; set; }
        public string OperatorDepartmentName { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public DateTime OperatorDatetime { get; set; }
        public DateTime? OperatorDatetime { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public DateTime CreateDatetime { get; set; }
        public DateTime CreateDatetime { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string Remark { get; set; }
        public string Remark { get; set; }
        
          
        #endregion
	}
}