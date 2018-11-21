using System;
using System.Data;

namespace InternalControl.Models
{
    /// <summary>
    /// SPExecuteProjectExpertsMerge[类]
    /// </summary>
    [Serializable]
	public class SPExecuteProjectExpertsMerge 
	{       
              
        #region 属性
        /// <summary>
		/// 
		/// </summary>
		public int ExecuteProjectId { get; set; }
        /// <summary>
		/// 
		/// </summary>
		public DataTable IdListOfExecuteProjectExperts { get; set; }
        /// <summary>
		/// 
		/// </summary>
		public DataTable BackupIdListOfExecuteProjectExperts { get; set; }
        
          
        #endregion
	}
}