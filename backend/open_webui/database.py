# backend/open_webui/database.py
import sqlite3
from sqlite3 import Connection
from typing import Optional, Dict, Any

class SQLDatabase:
    def __init__(self, path: str = ":memory:"):
        self.path = path
        self.conn: Optional[Connection] = None
        
    def __enter__(self):
        self.connect()
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        self.close()
        
    def connect(self):
        """建立数据库连接"""
        if not self.conn:
            self.conn = sqlite3.connect(self.path)
            self.conn.row_factory = sqlite3.Row
            
    def close(self):
        """关闭数据库连接"""
        if self.conn:
            self.conn.close()
            self.conn = None
            
    def execute(self, query: str, params: Optional[Dict[str, Any]] = None) -> sqlite3.Cursor:
        """执行SQL查询"""
        self.connect()
        return self.conn.execute(query, params or {})
    
    def backup(self, target_path: str):
        """备份数据库到文件"""
        if self.conn:
            with sqlite3.connect(target_path) as backup_conn:
                self.conn.backup(backup_conn)
                
    @property
    def tables(self) -> list:
        """获取所有表名"""
        cursor = self.execute("SELECT name FROM sqlite_master WHERE type='table'")
        return [row["name"] for row in cursor.fetchall()]