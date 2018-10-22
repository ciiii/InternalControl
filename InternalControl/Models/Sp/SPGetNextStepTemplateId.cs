using System;
using System.Data;

namespace InternalControl.Models
{
    /// <summary>
    /// SPGetNextStepTemplateId[类]
    /// </summary>
    [Serializable]
	public class SPGetNextStepTemplateId 
	{       
              
        #region 属性
        /// <summary>
		/// 
		/// </summary>
		public int stepId { get; set; }
        /// <summary>
		/// 
		/// </summary>
		public int state { get; set; }
        /// <summary>
		/// 
		/// </summary>
		public int result { get; set; }
        
          
        #endregion
	}
}