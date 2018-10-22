using System;
using System.Data;

namespace InternalControl.Models
{
    /// <summary>
    /// SPFlowInit[类]
    /// </summary>
    [Serializable]
	public class SPFlowInit 
	{       
              
        #region 属性
        /// <summary>
		/// 
		/// </summary>
		public int FlowTemplateId { get; set; }
        /// <summary>
		/// 
		/// </summary>
		public int SourceId { get; set; }
        /// <summary>
		/// 
		/// </summary>
		public int CreatorId { get; set; }
        
          
        #endregion
	}
}