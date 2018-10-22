using System;
using System.Data;
using System.ComponentModel;

namespace InternalControl.Models
{
    /// <summary>
    /// VNoticeReceivingCondition[类]
    /// </summary>
    [Serializable]
	public partial class VNoticeReceivingCondition 
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
		//public int NoticeId { get; set; }
        public int NoticeId { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int Type { get; set; }
        public int Type { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string TypeName { get; set; }
        public string TypeName { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public int ReceiverId { get; set; }
        public int ReceiverId { get; set; }
        /// <summary>
		/// 
		/// </summary>
		//public string ReceiverName { get; set; }
        public string ReceiverName { get; set; }
        
          
        #endregion
	}
}