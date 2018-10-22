using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

//public static void Main()

//{
//    string[] arr_pa = { @"c:\abc\", @"c:\abc", @"http://www.Test.com/", @"http://www.Test.com" };
//    string[] arr_pb = { @"\test.txt", @"/test.txt", @"test.txt" };
//    foreach (string pa in arr_pa)
//    {
//        foreach (string pb in arr_pb)
//        {
//            Console.WriteLine("'{0}' + '{1}'= '{2}'", pa, pb, MyPath.Combine(pa, pb));
//        }
//    }
//}

namespace MyLib
{
    class MyPath
    {
        private static string DirectorySeparatorChar = Path.DirectorySeparatorChar.ToString();
        private static string HttpSeparatorChar = "/";

        /// <summary>
        /// url和文件系统的路径都可处理,文件系统指的是windows的而不是mac os 或者linus(这两个下分割符是/)
        /// </summary>
        /// <param name="paths"></param>
        /// <returns></returns>
        public static string Combine(params string[] paths)
        {
            if (paths.Length == 0)
            {
                throw new ArgumentException($"请传入路径");
            }
            else
            {
                StringBuilder builder = new StringBuilder();
                string spliter = DirectorySeparatorChar;

                string firstPath = paths[0];

                if (firstPath.StartsWith("HTTP", StringComparison.OrdinalIgnoreCase))
                {
                    spliter = HttpSeparatorChar;
                }

                if (!firstPath.EndsWith(spliter))
                {
                    firstPath = firstPath + spliter;
                }
                builder.Append(firstPath);

                for (int i = 1; i < paths.Length; i++)
                {
                    string nextPath = paths[i];
                    if (nextPath.StartsWith(DirectorySeparatorChar) || nextPath.StartsWith(HttpSeparatorChar))
                    {
                        nextPath = nextPath.Substring(1);
                    }

                    if (i != paths.Length - 1)//not the last one
                    {
                        if (nextPath.EndsWith(DirectorySeparatorChar) || nextPath.EndsWith(HttpSeparatorChar))
                        {
                            nextPath = nextPath.Substring(0, nextPath.Length - 1) + spliter;
                        }
                        else
                        {
                            nextPath = nextPath + spliter;
                        }
                    }

                    builder.Append(nextPath);
                }

                return builder.ToString();
            }
        }

        /// <summary>
        /// 是否是绝对路径,注意:这个路径为文件系统的路径,而不是url;
        /// windows下判断 路径是否包含 ":"
        /// Mac OS、Linux下判断 路径是否包含 "\"
        /// </summary>
        /// <param name="path">路径</param>
        /// <returns></returns>
        public static bool IsAbsolute(string path)
        {
            return Path.VolumeSeparatorChar == ':' ? path.IndexOf(Path.VolumeSeparatorChar) > 0 : path.IndexOf('\\') > 0;
        }

        /// <summary>
        /// 获取某个文件系统路径的绝对路径,
        /// 如果path本来为绝对路径则不处理,否则以rootpath为根路径来构成
        /// 在不确定path是否绝对路径的时候用;
        /// </summary>
        /// <param name="path"></param>
        /// <param name="rootPath"></param>
        /// <returns></returns>
        public static string MapPath(string path, string rootPath)
        {
            return IsAbsolute(path) ? path : Combine(rootPath, path);
        }

        //下面的判断文件夹是否为空,是否存在;文件是否存在还有点用
        //其他的不是照搬path|directory|file的属性,就是做了没啥用的事情;
        //没啥用的事情指的是new FileStream(fileName, FileMode.Member, FileAccess.Member);可以全部处理完的事情;
        #region directory
        /// <summary>
        /// 注意path这些请传绝对路径;自己用mappath处理了再传
        /// </summary>
        /// <param name="directoryPath"></param>
        /// <returns></returns>
        public static bool IsDirectoryExist(string directoryPath) => Directory.Exists(directoryPath);

        public static bool IsEmptyDirectory(string directoryPath) =>
            Directory.GetFiles(directoryPath).Length <= 0 && Directory.GetDirectories(directoryPath).Length <= 0;

        /// <summary>
        /// 如果文件夹已经存在不报错,返回已存在的文件夹即可;
        /// </summary>
        /// <param name="directoryPath"></param>
        /// <returns></returns>
        public static DirectoryInfo CreateDirectory(string directoryPath)
        {
            if (!IsDirectoryExist(directoryPath))
            {
                try
                {
                    return Directory.CreateDirectory(directoryPath);
                }
                catch (Exception ex)
                {

                    throw ex;
                }
            }
            else
            {
                //throw new Exception("文件夹已存在");
                return new DirectoryInfo(directoryPath);
            }
        }

        #endregion

        #region file
        public static bool IsFileExist(string fileNameWithPath) => File.Exists(fileNameWithPath);

        public static FileInfo CreateFile(string fileNameWithPath)
        {
            if (!IsFileExist(fileNameWithPath))
            {
                var file = new FileInfo(fileNameWithPath);
                file.Create();
                return file;
            }
            else
            {
                return new FileInfo(fileNameWithPath);
            }
        }
        #endregion
    }
}
