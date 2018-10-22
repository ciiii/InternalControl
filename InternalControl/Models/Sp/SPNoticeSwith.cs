using System;
using System.Data;

namespace InternalControl.Models
{
    /// <summary>
    /// SPNoticeSwith[类]
    /// </summary>
    [Serializable]
	public class SPNoticeSwith 
	{       
              
        #region 属性
        /// <summary>
		/// 
		/// </summary>
		public bool IsEnabled { get; set; }
        /// <summary>
		/// 
		/// </summary>
		public DataTable NoticeIdList { get; set; }
        
          
        #endregion
	}
}