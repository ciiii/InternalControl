using System;
using System.Data;

namespace InternalControl.Models
{
    /// <summary>
    /// SPExecuteProjectMerge[类]
    /// </summary>
    [Serializable]
	public class SPExecuteProjectMerge 
	{       
              
        #region 属性
        /// <summary>
		/// 
		/// </summary>
		public DataTable List { get; set; }
        /// <summary>
		/// 
		/// </summary>
		public DataTable ListOfMergeExecuteProjectId { get; set; }
        
          
        #endregion
	}
}