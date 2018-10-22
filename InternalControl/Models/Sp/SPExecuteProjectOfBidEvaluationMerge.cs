using System;
using System.Data;

namespace InternalControl.Models
{
    /// <summary>
    /// SPExecuteProjectOfBidEvaluationMerge[类]
    /// </summary>
    [Serializable]
	public class SPExecuteProjectOfBidEvaluationMerge 
	{       
              
        #region 属性
        /// <summary>
		/// 
		/// </summary>
		public DataTable List { get; set; }
        /// <summary>
		/// 
		/// </summary>
		public DataTable ListOfPackageOfBidEvaluation { get; set; }
        
          
        #endregion
	}
}