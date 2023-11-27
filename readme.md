


# Auto set node version 20

Må bruke zsh...


## Solution here 
## https://stackoverflow.com/questions/60051990/set-node-version-differently-for-specific-projectfolder-via-nvm
create a .nvmrc file in the desired directory and add your required <node version>
Ex: 18 or 18.1 or 18.3.1 and ensure the specified version is installed on your machine. If 18 is mentioned, any installed version with a major as 18 will be picked.

### Add below lines to your .zshrc
```sh
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

  nvm_auto_use() {
    local node_version="$(nvm version)"
    local nvmrc_path="$(nvm_find_nvmrc)"

    if [ -n "$nvmrc_path" ]; then
      local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")

      if [ "$nvmrc_node_version" = "N/A" ]; then
        nvm install
      elif [ "$nvmrc_node_version" != "$node_version" ]; then
        nvm use
      fi
    elif [ "$node_version" != "$(nvm version default)" ]; then
      echo "Reverting to nvm default version"
      nvm use default
    fi
  }
  add-zsh-hook chpwd nvm_auto_use
  nvm_auto_use
```
### to apply:
### https://unix.stackexchange.com/questions/532548/how-do-i-apply-the-changes-to-the-zshrc-file-after-editing-it
 exec zsh

