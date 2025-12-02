# Push Using SSH (Easiest Method)

## ✅ Step-by-Step SSH Setup

### Step 1: Check if you already have SSH key

```powershell
Test-Path ~/.ssh/id_ed25519.pub
```

If it returns `True`, skip to Step 3.

### Step 2: Generate SSH Key

```powershell
ssh-keygen -t ed25519 -C "hasim@saisoftglobal.com"
```

- **Press Enter** for default file location
- **Press Enter** for no passphrase (or enter one if you want)
- **Press Enter** to confirm

### Step 3: Copy Your Public Key

```powershell
cat ~/.ssh/id_ed25519.pub
```

**Copy the entire output** (it starts with `ssh-ed25519` and ends with your email)

### Step 4: Add SSH Key to GitHub

1. **Go to**: https://github.com/settings/keys
2. **Click**: "New SSH key"
3. **Title**: `SmartParks-Push`
4. **Key**: Paste the key you copied
5. **Click**: "Add SSH key"

### Step 5: Change Git Remote to SSH

```powershell
git remote set-url origin git@github.com:Saisoftitcgithub/Smartparks-1.git
```

### Step 6: Test SSH Connection

```powershell
ssh -T git@github.com
```

You should see: `Hi Saisoftitcgithub! You've successfully authenticated...`

### Step 7: Push the Code

```powershell
git push -u origin main
```

## ✅ That's It!

After Step 7, your code will be on GitHub!

Check: https://github.com/Saisoftitcgithub/Smartparks-1

---

**This method doesn't require tokens and is more secure!**

