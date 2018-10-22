using System;
using System.Data;

namespace InternalControl.Models
{
    /// <summary>
    /// SPNoticeMerge[类]
    /// </summary>
    [Serializable]
	public class SPNoticeMerge 
	{       
              
        #region 属性
        /// <summary>
		/// 
		/// </summary>
		public DataTable List { get; set; }
        /// <summary>
		/// 
		/// </summary>
		public DataTable ListOfNoticeReceivingCondition { get; set; }
        
          
        #endregion
	}
}