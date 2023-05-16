export abstract class CacheService{
  protected getItem<T>(key: string): T | string | null {
    const data = localStorage.getItem(key);
    if (data != null) {
      try{
        return JSON.parse(data);
      }catch{
        return data;
      }
    }
    return null
  }

  protected setItem(key: string, data: object | string){
    if(typeof(data) === 'string'){
      localStorage.setItem(key, data);
    }
    else{
      localStorage.setItem(key, JSON.stringify(data));
    }
  }

  protected removeItem(key: string){
    localStorage.removeItem(key);
  }

  protected clear(){
    localStorage.clear();
  }
}
