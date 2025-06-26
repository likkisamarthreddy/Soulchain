import React, { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { useAccount, useConnect, useDisconnect, useWalletClient, usePublicClient, useSwitchChain } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { bsc } from 'wagmi/chains';
import {
  Heart,
  TrendingUp,
  Users,
  Award,
  Clock,
  DollarSign,
  ExternalLink,
  Copy,
  CheckCircle,
  AlertCircle,
  Loader,
  Star,
  Target,
  Gift,
  LogOut,
  Calculator,
  History,
  BarChart3,
  PieChart,
  Settings,
  Bell,
  Filter,
  Download,
  RefreshCw,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Activity,
  Percent,
  Coins,
  Smartphone,
  Globe,
  Shield,
  ChevronDown,
  ChevronUp,
  Search,
  Plus,
  Minus,
  Eye,
  EyeOff,
  Maximize,
  Minimize,
  Home,
  User,
  Menu,
  X,
  Wallet,
  Sparkles,
  Zap,
  BookOpen,
  Archive,
  Lock,
  Unlock,
  MessageCircle,
  Send,
  Share2,
  Layers,
  Database,
  Network,
  Fingerprint,
  Brain,
  Lightbulb,
  Infinity,
  Crown,
  Diamond,
  Gem
} from 'lucide-react';

// Contract ABIs
const PRESALE_ABI = [
  "function buyWithBNB(address referrer) external payable",
  "function buyWithUSDT(uint256 usdtAmount, address referrer) external",
  "function getCurrentStageInfo() external view returns (uint256 price, uint32 bonus, uint256 sold, uint256 allocation)",
  "function getUserInfo(address user) external view returns (uint256 contributions, uint256 tokensPurchased, uint256 tokensVested, uint256 claimable, address referrer, uint256 referralBonuses)",
  "function getStageInfo(uint8 stage) external view returns (uint256 price, uint32 bonus, uint256 sold, uint256 allocation)",
  "function getTotalTokensSold() external view returns (uint256)",
  "function totalRaised() external view returns (uint256)",
  "function currentStage() external view returns (uint8)",
  "function presaleActive() external view returns (bool)",
  "function tgeEnabled() external view returns (bool)",
  "function claimTokens() external",
  "function claimReferralBonus() external",
  "function getBNBPrice() external view returns (uint256)",
  "function getStageUSDPrice(uint8 stage) external view returns (uint256)"
];

const ERC20_ABI = [
  "function balanceOf(address owner) external view returns (uint256)",
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function symbol() external view returns (string)",
  "function decimals() external view returns (uint8)"
];

// Contract addresses
const PRESALE_ADDRESS = "0x109351D517BB66135b450Ed9039bD66fCd92278d";
const SOUL_TOKEN_ADDRESS = "0x34B0D9C19177A5E6B145C66FF7660047C26Bc1cc";
const USDT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955"; // BSC Mainnet USDT

// Interfaces
interface StageInfo {
  price: string;
  bonus: number;
  sold: string;
  allocation: string;
}

interface UserInfo {
  contributions: string;
  tokensPurchased: string;
  tokensVested: string;
  claimable: string;
  referrer: string;
  referralBonuses: string;
}

interface Transaction {
  id: string;
  hash: string;
  type: 'buy' | 'claim' | 'referral';
  amount: string;
  currency: string;
  tokensReceived: string;
  bonus: string;
  timestamp: number;
  status: 'pending' | 'completed' | 'failed';
  stage: number;
}

interface EmotionalMoment {
  id: string;
  emotion: string;
  intensity: number;
  timestamp: number;
  description: string;
  category: 'joy' | 'love' | 'hope' | 'peace' | 'excitement' | 'gratitude' | 'wonder' | 'nostalgia';
  color: string;
}

// Stage configuration
const STAGE_CONFIG = [
  { stage: 1, price: 0.005, bonus: 20, allocation: 200000000, emotion: "First Spark", description: "The beginning of emotional awakening" },
  { stage: 2, price: 0.010, bonus: 18, allocation: 200000000, emotion: "Growing Connection", description: "Bonds start to form" },
  { stage: 3, price: 0.015, bonus: 16, allocation: 200000000, emotion: "Deep Understanding", description: "Empathy blossoms" },
  { stage: 4, price: 0.020, bonus: 14, allocation: 200000000, emotion: "Profound Love", description: "Hearts unite across space" },
  { stage: 5, price: 0.025, bonus: 12, allocation: 200000000, emotion: "Shared Joy", description: "Collective happiness emerges" },
  { stage: 6, price: 0.030, bonus: 10, allocation: 200000000, emotion: "Infinite Hope", description: "Dreams become reality" },
  { stage: 7, price: 0.035, bonus: 8, allocation: 200000000, emotion: "Pure Bliss", description: "Transcendent moments" },
  { stage: 8, price: 0.040, bonus: 6, allocation: 200000000, emotion: "Eternal Peace", description: "Harmony achieved" },
  { stage: 9, price: 0.045, bonus: 4, allocation: 200000000, emotion: "Divine Wonder", description: "Awe-inspiring beauty" },
  { stage: 10, price: 0.050, bonus: 2, allocation: 200000000, emotion: "Soul Ascension", description: "Ultimate emotional evolution" },
];

const LISTING_PRICE = 0.1;

// Quick amounts
const BNB_AMOUNTS = [0.1, 1, 2, 5];
const USDT_AMOUNTS = [10, 100, 500, 1000];

// Emotional moments
const EMOTIONAL_MOMENTS: EmotionalMoment[] = [
  { id: '1', emotion: 'Pure Joy', intensity: 95, timestamp: Date.now(), description: 'A moment of unbridled happiness', category: 'joy', color: '#FFD700' },
  { id: '2', emotion: 'Deep Love', intensity: 98, timestamp: Date.now() - 1000, description: 'Profound connection with another soul', category: 'love', color: '#FF69B4' },
  { id: '3', emotion: 'Infinite Hope', intensity: 92, timestamp: Date.now() - 2000, description: 'Belief in a brighter tomorrow', category: 'hope', color: '#87CEEB' },
  { id: '4', emotion: 'Serene Peace', intensity: 89, timestamp: Date.now() - 3000, description: 'Complete tranquility of mind', category: 'peace', color: '#98FB98' },
  { id: '5', emotion: 'Electric Excitement', intensity: 94, timestamp: Date.now() - 4000, description: 'Anticipation of wonderful things', category: 'excitement', color: '#FF6347' },
  { id: '6', emotion: 'Overwhelming Gratitude', intensity: 96, timestamp: Date.now() - 5000, description: 'Thankfulness for life\'s blessings', category: 'gratitude', color: '#DDA0DD' },
  { id: '7', emotion: 'Childlike Wonder', intensity: 91, timestamp: Date.now() - 6000, description: 'Amazement at the world\'s beauty', category: 'wonder', color: '#F0E68C' },
  { id: '8', emotion: 'Sweet Nostalgia', intensity: 88, timestamp: Date.now() - 7000, description: 'Cherished memories of the past', category: 'nostalgia', color: '#DEB887' },
];

function PresaleSection() {
  // Wagmi hooks
  const { address, isConnected, chain } = useAccount();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const { open } = useWeb3Modal();

  // Core state
  const [currentStage, setCurrentStage] = useState<number>(1);
  const [stageInfo, setStageInfo] = useState<StageInfo | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [totalRaised, setTotalRaised] = useState<string>('0');
  const [totalTokensSold, setTotalTokensSold] = useState<string>('0');
  const [liveBnbPrice, setLiveBnbPrice] = useState<number>(666);
  const [loading, setLoading] = useState<boolean>(false);
  const [txLoading, setTxLoading] = useState<boolean>(false);
  const [dataLoading, setDataLoading] = useState<boolean>(false);

  // Balance state
  const [bnbBalance, setBnbBalance] = useState<string>('0');
  const [usdtBalance, setUsdtBalance] = useState<string>('0');
  const [balanceLoading, setBalanceLoading] = useState<boolean>(false);

  // UI state
  const [activeTab, setActiveTab] = useState<'home' | 'calculator' | 'history' | 'referrals' | 'portfolio' | 'emotions'>('home');
  const [notification, setNotification] = useState<{type: 'success' | 'error' | 'info', message: string} | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Purchase state
  const [buyAmount, setBuyAmount] = useState<string>('');
  const [buyMethod, setBuyMethod] = useState<'BNB' | 'USDT'>('BNB');
  const [referralCode, setReferralCode] = useState<string>('');
  const [calculatedTokens, setCalculatedTokens] = useState<string>('0');
  const [calculatedBonus, setCalculatedBonus] = useState<string>('0');

  // Other state
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [roiInvestment, setRoiInvestment] = useState<string>('100');
  const [roiStage, setRoiStage] = useState<number>(1);
  const [roiResults, setRoiResults] = useState<any>(null);
  const [historyFilter, setHistoryFilter] = useState<'all' | 'buy' | 'claim' | 'referral'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Emotional state
  const [currentEmotion, setCurrentEmotion] = useState<EmotionalMoment>(EMOTIONAL_MOMENTS[0]);

  // Contract instances
  const [presaleContract, setPresaleContract] = useState<ethers.Contract | null>(null);

  // Initialize contract when wallet is connected
  useEffect(() => {
    if (isConnected && walletClient && address) {
      try {
        const signer = new ethers.providers.Web3Provider(walletClient.transport).getSigner();
        const contract = new ethers.Contract(PRESALE_ADDRESS, PRESALE_ABI, signer);
        setPresaleContract(contract);

        // Load saved transactions
        const savedTxs = localStorage.getItem(`transactions_${address}`);
        if (savedTxs) {
          try {
            setTransactions(JSON.parse(savedTxs));
          } catch (error) {
            console.error('Error parsing saved transactions:', error);
            setTransactions([]);
          }
        }
      } catch (error) {
        console.error('Error initializing contract:', error);
        showNotification('error', 'Failed to initialize contract. Please refresh the page.');
      }
    } else {
      setPresaleContract(null);
      setUserInfo(null);
      setTransactions([]);
      setBnbBalance('0');
      setUsdtBalance('0');
    }
  }, [isConnected, walletClient, address]);

  // Auto-switch to BSC if on wrong network
  useEffect(() => {
    if (isConnected && chain && chain.id !== bsc.id && switchChain) {
      switchChain({ chainId: bsc.id }).catch((error) => {
        console.error('Error switching to BSC:', error);
        showNotification('error', 'Please switch to BSC network manually');
      });
    }
  }, [isConnected, chain, switchChain]);

  // Fetch live BNB price with error handling
  const fetchLiveBnbPrice = useCallback(async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd',
        { 
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
          }
        }
      );
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.binancecoin && data.binancecoin.usd && typeof data.binancecoin.usd === 'number') {
        setLiveBnbPrice(data.binancecoin.usd);
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error fetching BNB price:', error);
      // Keep current price if fetch fails
      if (liveBnbPrice === 666) {
        // Set a reasonable fallback price if we never got a real price
        setLiveBnbPrice(600);
      }
    }
  }, [liveBnbPrice]);

  // Fetch wallet balances with improved error handling
  const fetchBalances = useCallback(async () => {
    if (!publicClient || !address) return;

    try {
      setBalanceLoading(true);
      
      // Get BNB balance with timeout
      const bnbBalancePromise = publicClient.getBalance({ address });
      const bnbBalance = await Promise.race([
        bnbBalancePromise,
        new Promise((_, reject) => setTimeout(() => reject(new Error('BNB balance timeout')), 8000))
      ]);
      setBnbBalance(ethers.utils.formatEther(bnbBalance.toString()));

      // Get USDT balance with timeout
      const usdtBalancePromise = publicClient.readContract({
        address: USDT_ADDRESS as `0x${string}`,
        abi: ERC20_ABI,
        functionName: 'balanceOf',
        args: [address],
      });
      
      const usdtBalance = await Promise.race([
        usdtBalancePromise,
        new Promise((_, reject) => setTimeout(() => reject(new Error('USDT balance timeout')), 8000))
      ]);
      setUsdtBalance(ethers.utils.formatUnits(usdtBalance.toString(), 18));
    } catch (error) {
      console.error('Error fetching balances:', error);
      // Keep previous values on error instead of resetting to 0
    } finally {
      setBalanceLoading(false);
    }
  }, [publicClient, address]);

  // Utility functions
  const showNotification = (type: 'success' | 'error' | 'info', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      showNotification('success', 'Copied to clipboard! 💖');
      setTimeout(() => setCopied(false), 2000);
    }).catch((error) => {
      console.error('Copy failed:', error);
      showNotification('error', 'Failed to copy to clipboard');
    });
  };

  const formatNumber = (num: string | number, decimals: number = 2) => {
    let numValue: number;
    
    if (typeof num === 'string') {
      numValue = parseFloat(num);
    } else {
      numValue = num;
    }
    
    if (isNaN(numValue) || numValue === 0) return '0';
    if (numValue >= 1000000) {
      return `${(numValue / 1000000).toFixed(decimals)}M`;
    }
    if (numValue >= 1000) {
      return `${(numValue / 1000).toFixed(decimals)}K`;
    }
    return numValue.toFixed(decimals);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const calculatePurchaseBonus = useCallback((amount: string, stage: number, method: 'BNB' | 'USDT') => {
    if (!amount || isNaN(parseFloat(amount))) return { tokens: '0', bonus: '0', total: '0' };

    const stageConfig = STAGE_CONFIG.find(s => s.stage === stage);
    if (!stageConfig) return { tokens: '0', bonus: '0', total: '0' };

    const amountNum = parseFloat(amount);
    let usdValue = amountNum;

    if (method === 'BNB') {
      usdValue = amountNum * liveBnbPrice;
    }

    const baseTokens = usdValue / stageConfig.price;
    const bonusTokens = (baseTokens * stageConfig.bonus) / 100;
    const totalTokens = baseTokens + bonusTokens;

    return {
      tokens: baseTokens.toFixed(2),
      bonus: bonusTokens.toFixed(2),
      total: totalTokens.toFixed(2)
    };
  }, [liveBnbPrice]);

  // Update calculated tokens when amount, stage, or method changes
  useEffect(() => {
    if (buyAmount && currentStage) {
      const result = calculatePurchaseBonus(buyAmount, currentStage, buyMethod);
      setCalculatedTokens(result.total);
      setCalculatedBonus(result.bonus);
    } else {
      setCalculatedTokens('0');
      setCalculatedBonus('0');
    }
  }, [buyAmount, currentStage, buyMethod, calculatePurchaseBonus]);

  // ROI Calculator
  const calculateROI = useCallback(() => {
    if (!roiInvestment || isNaN(parseFloat(roiInvestment))) return;

    const investment = parseFloat(roiInvestment);
    const stageConfig = STAGE_CONFIG.find(s => s.stage === roiStage);
    if (!stageConfig) return;

    const tokensReceived = investment / stageConfig.price;
    const bonusTokens = (tokensReceived * stageConfig.bonus) / 100;
    const totalTokens = tokensReceived + bonusTokens;

    const valueAtListing = totalTokens * LISTING_PRICE;
    const valueAt1Dollar = totalTokens * 1.0;
    const valueAt5Dollar = totalTokens * 5.0;

    const profitAtListing = valueAtListing - investment;
    const profitAt1Dollar = valueAt1Dollar - investment;
    const profitAt5Dollar = valueAt5Dollar - investment;

    const roiAtListing = (profitAtListing / investment) * 100;
    const roiAt1Dollar = (profitAt1Dollar / investment) * 100;
    const roiAt5Dollar = (profitAt5Dollar / investment) * 100;

    setRoiResults({
      investment,
      tokensReceived: tokensReceived.toFixed(2),
      bonusTokens: bonusTokens.toFixed(2),
      totalTokens: totalTokens.toFixed(2),
      valueAtListing: valueAtListing.toFixed(2),
      valueAt1Dollar: valueAt1Dollar.toFixed(2),
      valueAt5Dollar: valueAt5Dollar.toFixed(2),
      profitAtListing: profitAtListing.toFixed(2),
      profitAt1Dollar: profitAt1Dollar.toFixed(2),
      profitAt5Dollar: profitAt5Dollar.toFixed(2),
      roiAtListing: roiAtListing.toFixed(2),
      roiAt1Dollar: roiAt1Dollar.toFixed(2),
      roiAt5Dollar: roiAt5Dollar.toFixed(2)
    });
  }, [roiInvestment, roiStage]);

  useEffect(() => {
    calculateROI();
  }, [calculateROI]);

  // Emotional moments cycling
  useEffect(() => {
    const interval = setInterval(() => {
      const randomMoment = EMOTIONAL_MOMENTS[Math.floor(Math.random() * EMOTIONAL_MOMENTS.length)];
      setCurrentEmotion(randomMoment);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Wallet connection functions
  const connectWallet = async () => {
    try {
      setLoading(true);
      await open();
      showNotification('success', 'Welcome to SoulChain! Your wallet is connected! 💖✨');
    } catch (error: any) {
      console.error('Connection error:', error);
      showNotification('error', `Connection failed: ${error.message || 'Unknown error'} 💔`);
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    disconnect();
    showNotification('info', 'Until we meet again, beautiful soul! 💫');
  };

  // Enhanced fetch contract data with better error handling and retries
  const fetchData = useCallback(async () => {
    if (!publicClient || !address) return;

    try {
      setDataLoading(true);
      
      // Use publicClient for read-only calls to avoid wallet connection issues
      const [
        currentStageData,
        totalRaisedData,
        totalSoldData
      ] = await Promise.all([
        publicClient.readContract({
          address: PRESALE_ADDRESS as `0x${string}`,
          abi: PRESALE_ABI,
          functionName: 'currentStage',
        }),
        publicClient.readContract({
          address: PRESALE_ADDRESS as `0x${string}`,
          abi: PRESALE_ABI,
          functionName: 'totalRaised',
        }),
        publicClient.readContract({
          address: PRESALE_ADDRESS as `0x${string}`,
          abi: PRESALE_ABI,
          functionName: 'getTotalTokensSold',
        })
      ]);

      // Set basic data first
      setCurrentStage(Number(currentStageData));
      setTotalRaised(ethers.utils.formatEther(totalRaisedData.toString()));
      setTotalTokensSold(ethers.utils.formatEther(totalSoldData.toString()));

      // Fetch stage info and user info separately with individual error handling
      try {
        const stageData = await publicClient.readContract({
          address: PRESALE_ADDRESS as `0x${string}`,
          abi: PRESALE_ABI,
          functionName: 'getCurrentStageInfo',
        });

        setStageInfo({
          price: ethers.utils.formatUnits(stageData[0], 6), // Price is in 6 decimals
          bonus: Number(stageData[1]), // This is already a regular number
          sold: ethers.utils.formatEther(stageData[2]),
          allocation: ethers.utils.formatEther(stageData[3])
        });
      } catch (error) {
        console.error('Error fetching stage info:', error);
      }

      // Fetch user info if connected
      if (address) {
        try {
          const userData = await publicClient.readContract({
            address: PRESALE_ADDRESS as `0x${string}`,
            abi: PRESALE_ABI,
            functionName: 'getUserInfo',
            args: [address],
          });

          setUserInfo({
            contributions: ethers.utils.formatEther(userData[0]),
            tokensPurchased: ethers.utils.formatEther(userData[1]),
            tokensVested: ethers.utils.formatEther(userData[2]),
            claimable: ethers.utils.formatEther(userData[3]),
            referrer: userData[4],
            referralBonuses: ethers.utils.formatEther(userData[5])
          });
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      }

    } catch (error) {
      console.error('Error fetching contract data:', error);
      showNotification('error', 'Failed to fetch latest data. Retrying...');
      
      // Retry once after a delay
      setTimeout(() => {
        if (publicClient && address) {
          fetchData();
        }
      }, 3000);
    } finally {
      setDataLoading(false);
    }
  }, [publicClient, address]);

  const buyTokens = async () => {
    if (!presaleContract || !walletClient || !buyAmount) return;

    try {
      setTxLoading(true);
      let tx;

      if (buyMethod === 'BNB') {
        const amount = ethers.utils.parseEther(buyAmount);
        const referrer = referralCode || ethers.constants.AddressZero;
        
        // Estimate gas first
        const gasEstimate = await presaleContract.estimateGas.buyWithBNB(referrer, { value: amount });
        const gasLimit = gasEstimate.mul(120).div(100); // Add 20% buffer
        
        tx = await presaleContract.buyWithBNB(referrer, { 
          value: amount,
          gasLimit: gasLimit
        });
      } else {
        const provider = new ethers.providers.Web3Provider(walletClient.transport);
        const signer = provider.getSigner();
        const usdtContract = new ethers.Contract(USDT_ADDRESS, ERC20_ABI, signer);
        const allowance = await usdtContract.allowance(address, PRESALE_ADDRESS);
        const usdtAmount = ethers.utils.parseUnits(buyAmount, 18); // USDT on BSC has 18 decimals

        if (allowance.lt(usdtAmount)) {
          showNotification('info', 'Preparing your emotional investment... 💝');
          const approveTx = await usdtContract.approve(PRESALE_ADDRESS, usdtAmount);
          await approveTx.wait();
        }

        const referrer = referralCode || ethers.constants.AddressZero;
        
        // Estimate gas first
        const gasEstimate = await presaleContract.estimateGas.buyWithUSDT(usdtAmount, referrer);
        const gasLimit = gasEstimate.mul(120).div(100); // Add 20% buffer
        
        tx = await presaleContract.buyWithUSDT(usdtAmount, referrer, {
          gasLimit: gasLimit
        });
      }

      const newTx: Transaction = {
        id: Date.now().toString(),
        hash: tx.hash,
        type: 'buy',
        amount: buyAmount,
        currency: buyMethod,
        tokensReceived: calculatedTokens,
        bonus: calculatedBonus,
        timestamp: Date.now(),
        status: 'pending',
        stage: currentStage
      };

      const updatedTxs = [newTx, ...transactions];
      setTransactions(updatedTxs);
      localStorage.setItem(`transactions_${address}`, JSON.stringify(updatedTxs));

      showNotification('info', 'Your emotional investment is being processed... 💫');
      await tx.wait();

      const confirmedTxs = updatedTxs.map(t =>
        t.id === newTx.id ? { ...t, status: 'completed' as const } : t
      );
      setTransactions(confirmedTxs);
      localStorage.setItem(`transactions_${address}`, JSON.stringify(confirmedTxs));

      showNotification('success', `🎉 Welcome to the emotional revolution! You've acquired ${calculatedTokens} SOUL tokens! 💖`);
      setBuyAmount('');
      await fetchData();
      await fetchBalances();
    } catch (error: any) {
      console.error('Buy error:', error);
      
      let errorMessage = 'Purchase failed';
      if (error.code === 4001) {
        errorMessage = 'Transaction cancelled by user';
      } else if (error.code === -32603) {
        errorMessage = 'Internal error - please try again';
      } else if (error.reason) {
        errorMessage = error.reason;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      showNotification('error', `${errorMessage} 💔`);

      const failedTxs = transactions.map(t =>
        t.hash === (error.transaction?.hash) ? { ...t, status: 'failed' as const } : t
      );
      setTransactions(failedTxs);
      localStorage.setItem(`transactions_${address}`, JSON.stringify(failedTxs));
    } finally {
      setTxLoading(false);
    }
  };

  const claimTokens = async () => {
    if (!presaleContract) return;

    try {
      setTxLoading(true);
      const tx = await presaleContract.claimTokens();

      const newTx: Transaction = {
        id: Date.now().toString(),
        hash: tx.hash,
        type: 'claim',
        amount: userInfo?.claimable || '0',
        currency: 'SOUL',
        tokensReceived: userInfo?.claimable || '0',
        bonus: '0',
        timestamp: Date.now(),
        status: 'pending',
        stage: currentStage
      };

      const updatedTxs = [newTx, ...transactions];
      setTransactions(updatedTxs);

      showNotification('info', 'Claiming your emotional treasures... 💎');
      await tx.wait();

      const confirmedTxs = updatedTxs.map(t =>
        t.id === newTx.id ? { ...t, status: 'completed' as const } : t
      );
      setTransactions(confirmedTxs);
      localStorage.setItem(`transactions_${address}`, JSON.stringify(confirmedTxs));

      showNotification('success', 'Your SOUL tokens have been claimed! Feel the emotional power! ✨💖');
      await fetchData();
    } catch (error: any) {
      console.error('Claim error:', error);
      showNotification('error', `Claim failed: ${error.reason || error.message} 💔`);
    } finally {
      setTxLoading(false);
    }
  };

  // Quick amount selection handlers
  const handleQuickAmount = (amount: number) => {
    setBuyAmount(amount.toString());
  };

  // Tab navigation
  const NavItem = ({ tab, icon, label, isActive, onClick }: any) => (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 rounded-xl font-medium transition-all duration-300 text-sm hover:scale-105 ${
        isActive
          ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white shadow-lg shadow-pink-500/25'
          : 'bg-white/10 backdrop-blur-lg text-pink-200 hover:text-white hover:bg-white/20 border border-white/20'
      }`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );

  // Filter transactions
  const filteredTransactions = transactions
    .filter(tx => historyFilter === 'all' || tx.type === historyFilter)
    .filter(tx =>
      searchTerm === '' ||
      tx.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Effect to fetch data when connected
  useEffect(() => {
    let isMounted = true;
    
    if (publicClient) {
      const loadData = async () => {
        if (isMounted) {
          await fetchData();
          if (address) {
            await fetchBalances();
          }
        }
      };

      loadData();

      // Set up interval for periodic updates
      const interval = setInterval(() => {
        if (isMounted && publicClient) {
          loadData();
        }
      }, 15000); // Reduced frequency to 15 seconds for better mobile performance

      return () => {
        isMounted = false;
        clearInterval(interval);
      };
    }
  }, [publicClient, address]);

  // Effect to fetch BNB price
  useEffect(() => {
    fetchLiveBnbPrice();
    const interval = setInterval(fetchLiveBnbPrice, 300000); // 5 minutes
    return () => clearInterval(interval);
  }, [fetchLiveBnbPrice]);

  const progressPercentage = stageInfo
    ? (parseFloat(stageInfo.sold) / parseFloat(stageInfo.allocation)) * 100
    : 0;

  // Helper function to convert price from contract format to USD
  const priceToUSD = (priceStr: string) => {
    return parseFloat(priceStr);
  };

  // Calculate total participants (dummy data for now)
  const totalParticipants = Math.floor(parseFloat(totalTokensSold) / 1000) || 1847;

  return (
    <section id="presale" className="section-padding bg-gradient-to-br from-gray-900 via-black to-gray-950 relative text-white">
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 text-white transition-all duration-500 relative overflow-hidden">
      {/* Custom CSS for hiding input arrows and animations */}
      <style>{`
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type="number"] {
          -moz-appearance: textfield;
        }

        input[type="number"] {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-20px) rotate(5deg); }
          50% { transform: translateY(-10px) rotate(-5deg); }
          75% { transform: translateY(-15px) rotate(3deg); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
      `}</style>

      {/* Background Effects - Subtle sparkles only */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Subtle gradient background */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        {/* Floating Hearts - Reduced */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float opacity-10"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 4}s`,
              }}
            >
              <Heart
                size={15 + Math.random() * 20}
                className="text-pink-400"
                fill="currentColor"
              />
            </div>
          ))}
        </div>

        {/* Sparkles - Reduced */}
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            <Sparkles size={6 + Math.random() * 8} className="text-pink-300 opacity-40" />
          </div>
        ))}
      </div>

      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-2xl shadow-2xl backdrop-blur-lg border max-w-sm transform transition-all duration-300 ${
          notification.type === 'success' ? 'bg-green-500/20 border-green-500/30 text-green-300' :
          notification.type === 'error' ? 'bg-red-500/20 border-red-500/30 text-red-300' :
          'bg-blue-500/20 border-blue-500/30 text-blue-300'
        } animate-in slide-in-from-top-2 duration-300`}>
          <div className="flex items-start gap-3">
            {notification.type === 'success' && <CheckCircle size={20} className="mt-0.5 flex-shrink-0" />}
            {notification.type === 'error' && <AlertCircle size={20} className="mt-0.5 flex-shrink-0" />}
            {notification.type === 'info' && <Loader size={20} className="animate-spin mt-0.5 flex-shrink-0" />}
            <span className="font-medium text-sm leading-relaxed">{notification.message}</span>
          </div>
        </div>
      )}

      <div className="relative z-10">
        {/* Header */}
        <header className="backdrop-blur-xl bg-white/5 border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Logo */}
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-pink-500/25 hover:scale-110 transition-transform duration-300">
                  <Heart className="text-white animate-pulse" size={24} fill="currentColor" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                    SoulChain
                  </h1>
                  <p className="text-xs sm:text-sm text-pink-200">The Human Archive of Emotions</p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-4">
                {/* Current Emotion Display */}
                <div className="hidden md:block bg-white/10 backdrop-blur-lg border-white/20 rounded-2xl px-4 py-2 border">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full animate-pulse"
                      style={{ backgroundColor: currentEmotion.color }}
                    ></div>
                    <span className="text-sm font-medium">{currentEmotion.emotion}</span>
                    <div className="text-xs text-pink-300">{currentEmotion.intensity}%</div>
                  </div>
                </div>

                {/* Live BNB Price */}
                <div className="hidden md:block bg-white/10 backdrop-blur-lg border-white/20 rounded-2xl px-4 py-2 border">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">BNB: ${liveBnbPrice.toFixed(2)}</span>
                    <button
                      onClick={fetchLiveBnbPrice}
                      className="text-pink-300 hover:text-white transition-colors hover:scale-110"
                      disabled={dataLoading}
                    >
                      <RefreshCw size={14} className={dataLoading ? 'animate-spin' : ''} />
                    </button>
                  </div>
                </div>

                {isConnected && address ? (
                  <div className="flex items-center gap-2">
                    <div className="bg-white/10 backdrop-blur-lg border-white/20 rounded-2xl px-3 py-2 border">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="font-mono text-xs sm:text-sm">
                          {formatAddress(address)}
                        </span>
                        <button
                          onClick={() => copyToClipboard(address)}
                          className="text-pink-300 hover:text-white transition-colors hover:scale-110"
                        >
                          {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => open()}
                      disabled={loading}
                      className="bg-white/10 backdrop-blur-lg border-white/20 px-2 py-2 rounded-2xl hover:scale-105 transition-all duration-300 border disabled:opacity-50"
                      title="Switch Account"
                    >
                      <RefreshCw size={14} />
                    </button>

                    <button
                      onClick={disconnectWallet}
                      className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 px-3 py-2 rounded-2xl flex items-center gap-2 transition-all duration-300 hover:scale-105"
                    >
                      <LogOut size={14} />
                      <span className="hidden sm:inline text-sm">Disconnect</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={connectWallet}
                    disabled={loading}
                    className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 px-4 py-2 sm:px-6 sm:py-3 rounded-2xl font-semibold flex items-center gap-2 transition-all duration-300 shadow-2xl shadow-pink-500/25 disabled:opacity-50 hover:scale-105 text-sm"
                  >
                    {loading ? (
                      <Loader className="animate-spin" size={16} />
                    ) : (
                      <Heart size={16} fill="currentColor" />
                    )}
                    <span className="hidden sm:inline">{loading ? 'Connecting...' : 'Connect Soul'}</span>
                  </button>
                )}

                {/* Mobile Menu */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2 rounded-2xl bg-white/10 backdrop-blur-lg border-white/20 border hover:scale-105 transition-all duration-300"
                >
                  {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
              </div>
            </div>

            {/* Enhanced Mobile Navigation with all tabs */}
            {mobileMenuOpen && isConnected && (
              <div className="lg:hidden mt-4 p-4 bg-white/10 backdrop-blur-lg rounded-2xl border-white/20 border">
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <NavItem
                    tab="home"
                    icon={<Home size={16} />}
                    label="Home"
                    isActive={activeTab === 'home'}
                    onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
                  />
                  <NavItem
                    tab="calculator"
                    icon={<Calculator size={16} />}
                    label="ROI Calc"
                    isActive={activeTab === 'calculator'}
                    onClick={() => { setActiveTab('calculator'); setMobileMenuOpen(false); }}
                  />
                  <NavItem
                    tab="history"
                    icon={<History size={16} />}
                    label="History"
                    isActive={activeTab === 'history'}
                    onClick={() => { setActiveTab('history'); setMobileMenuOpen(false); }}
                  />
                  <NavItem
                    tab="referrals"
                    icon={<Users size={16} />}
                    label="Referrals"
                    isActive={activeTab === 'referrals'}
                    onClick={() => { setActiveTab('referrals'); setMobileMenuOpen(false); }}
                  />
                  <NavItem
                    tab="portfolio"
                    icon={<User size={16} />}
                    label="Soul Portfolio"
                    isActive={activeTab === 'portfolio'}
                    onClick={() => { setActiveTab('portfolio'); setMobileMenuOpen(false); }}
                  />
                  <NavItem
                    tab="emotions"
                    icon={<Heart size={16} />}
                    label="Emotion Archive"
                    isActive={activeTab === 'emotions'}
                    onClick={() => { setActiveTab('emotions'); setMobileMenuOpen(false); }}
                  />
                </div>

                {/* Mobile Current Emotion & BNB Price */}
                <div className="space-y-3">
                  <div className="p-3 bg-white/10 backdrop-blur-lg border-white/20 rounded-2xl border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full animate-pulse"
                          style={{ backgroundColor: currentEmotion.color }}
                        ></div>
                        <span className="text-sm font-medium">{currentEmotion.emotion}</span>
                      </div>
                      <div className="text-xs text-pink-300">{currentEmotion.intensity}%</div>
                    </div>
                  </div>

                  <div className="p-3 bg-white/10 backdrop-blur-lg border-white/20 rounded-2xl border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium">BNB: ${liveBnbPrice.toFixed(2)}</span>
                      </div>
                      <button
                        onClick={fetchLiveBnbPrice}
                        className="text-pink-300 hover:text-white transition-colors"
                        disabled={dataLoading}
                      >
                        <RefreshCw size={14} className={dataLoading ? 'animate-spin' : ''} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Navigation Tabs - Desktop */}
        {isConnected && (
          <div className="hidden lg:block backdrop-blur-xl bg-white/5 border-b border-white/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center gap-4">
                <NavItem
                  tab="home"
                  icon={<Home size={18} />}
                  label="Emotional Dashboard"
                  isActive={activeTab === 'home'}
                  onClick={() => setActiveTab('home')}
                />
                <NavItem
                  tab="calculator"
                  icon={<Calculator size={18} />}
                  label="Soul Calculator"
                  isActive={activeTab === 'calculator'}
                  onClick={() => setActiveTab('calculator')}
                />
                <NavItem
                  tab="history"
                  icon={<History size={18} />}
                  label="Emotional Journey"
                  isActive={activeTab === 'history'}
                  onClick={() => setActiveTab('history')}
                />
                <NavItem
                  tab="referrals"
                  icon={<Users size={18} />}
                  label="Soul Connections"
                  isActive={activeTab === 'referrals'}
                  onClick={() => setActiveTab('referrals')}
                />
                <NavItem
                  tab="portfolio"
                  icon={<User size={18} />}
                  label="Soul Portfolio"
                  isActive={activeTab === 'portfolio'}
                  onClick={() => setActiveTab('portfolio')}
                />
                <NavItem
                  tab="emotions"
                  icon={<Heart size={18} />}
                  label="Emotion Archive"
                  isActive={activeTab === 'emotions'}
                  onClick={() => setActiveTab('emotions')}
                />
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          {!isConnected ? (
            /* Welcome Section */
            <div className="text-center py-10 sm:py-20">
              <div className="mb-8 sm:mb-12">
                <div className="mb-6 sm:mb-8">
                  {/* Hero Logo */}
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-2xl shadow-pink-500/25 hover:scale-110 transition-transform duration-500">
                    <Heart className="text-white animate-pulse" size={48} fill="currentColor" />
                  </div>
                </div>
                <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent leading-tight">
                  Welcome to SoulChain
                </h2>
                <p className="text-lg sm:text-xl text-pink-200 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-4">
                  Join the revolution of authentic human connection. Be part of the first decentralized emotional archive on the blockchain -
                  where feelings become permanent and souls connect across time and space. 💖✨
                </p>
                <div className="text-base sm:text-lg text-purple-200 mb-8 max-w-3xl mx-auto px-4">
                  Every emotion matters. Every feeling has value. Every soul deserves to be remembered forever.
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto mb-12 sm:mb-16 px-4">
                {[
                  {
                    icon: <Heart size={28} fill="currentColor" />,
                    title: 'Emotional Archive',
                    desc: 'Store your deepest feelings permanently on the blockchain for future generations',
                    color: 'from-pink-500 to-rose-500'
                  },
                  {
                    icon: <Users size={28} />,
                    title: 'Soul Connections',
                    desc: 'Connect with kindred spirits who share your emotional wavelength',
                    color: 'from-purple-500 to-violet-500'
                  },
                  {
                    icon: <Sparkles size={28} />,
                    title: 'Emotional Rewards',
                    desc: 'Earn SOUL tokens for sharing authentic emotions and connecting hearts',
                    color: 'from-indigo-500 to-blue-500'
                  },
                  {
                    icon: <Shield size={28} />,
                    title: 'Forever Preserved',
                    desc: 'Your emotions are cryptographically secured and will exist for eternity',
                    color: 'from-teal-500 to-cyan-500'
                  },
                  {
                    icon: <Infinity size={28} />,
                    title: 'Timeless Legacy',
                    desc: 'Create an emotional legacy that transcends time and touches future souls',
                    color: 'from-green-500 to-emerald-500'
                  },
                  {
                    icon: <Brain size={28} />,
                    title: 'AI-Enhanced',
                    desc: 'Advanced AI helps understand and categorize the depth of human emotions',
                    color: 'from-orange-500 to-red-500'
                  }
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-lg border-white/20 rounded-3xl p-6 sm:p-8 border hover:border-pink-500/50 transition-all duration-500 hover:scale-105 group hover:shadow-2xl hover:shadow-pink-500/20"
                  >
                    <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-4 sm:mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <div className="text-white">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-pink-100">{feature.title}</h3>
                    <p className="text-pink-200 leading-relaxed text-sm sm:text-base">{feature.desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4">
                <button
                  onClick={connectWallet}
                  disabled={loading}
                  className="w-full sm:w-auto bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 px-12 sm:px-16 py-4 sm:py-6 rounded-2xl font-bold text-lg sm:text-xl flex items-center justify-center gap-3 sm:gap-4 transition-all duration-300 shadow-2xl shadow-pink-500/25 hover:shadow-pink-500/40 disabled:opacity-50 hover:scale-105"
                >
                  {loading ? (
                    <Loader className="animate-spin" size={24} />
                  ) : (
                    <Heart size={24} fill="currentColor" className="animate-pulse" />
                  )}
                  {loading ? 'Connecting Your Soul...' : 'Connect Your Soul to Begin'}
                </button>

                <div className="flex items-center gap-2 text-pink-200 text-sm sm:text-base">
                  <Shield size={18} />
                  <span>Secured by Blockchain Love</span>
                </div>
              </div>

              {/* Emotional Testimonials */}
              <div className="mt-16 sm:mt-20 max-w-4xl mx-auto">
                <h3 className="text-2xl sm:text-3xl font-bold mb-8 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Souls Already Connected
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      emotion: "Pure Joy",
                      message: "SoulChain helped me preserve the moment I first held my daughter. That feeling of overwhelming love is now eternal.",
                      intensity: 98,
                      color: "#FFD700"
                    },
                    {
                      emotion: "Deep Gratitude",
                      message: "I stored my grandmother's last words here. Knowing they'll exist forever brings me peace.",
                      intensity: 95,
                      color: "#FF69B4"
                    }
                  ].map((testimonial, index) => (
                    <div key={index} className="bg-white/10 backdrop-blur-lg border-white/20 rounded-2xl p-6 border hover:scale-105 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="w-4 h-4 rounded-full animate-pulse"
                          style={{ backgroundColor: testimonial.color }}
                        ></div>
                        <span className="font-bold text-pink-200">{testimonial.emotion}</span>
                        <span className="text-xs text-purple-300">{testimonial.intensity}%</span>
                      </div>
                      <p className="text-pink-100 italic leading-relaxed">"{testimonial.message}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6 sm:space-y-8">
              {activeTab === 'home' && (
                <>
                  {/* Emotional Stats Cards with improved data loading */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                    {[
                      {
                        title: 'Emotional Stage',
                        value: STAGE_CONFIG.find(s => s.stage === currentStage)?.emotion || `Stage ${currentStage}`,
                        icon: <Heart size={20} fill="currentColor" />,
                        suffix: '',
                        color: 'from-pink-500 to-rose-500',
                        trend: '+2.1%',
                        description: STAGE_CONFIG.find(s => s.stage === currentStage)?.description || ''
                      },
                      {
                        title: 'Hearts Raised',
                        value: dataLoading ? <Loader size={16} className="animate-spin" /> : formatNumber(totalRaised),
                        icon: <DollarSign size={20} />,
                        suffix: ' USD',
                        color: 'from-purple-500 to-violet-500',
                        trend: '+15.3%',
                        description: 'Total emotional investment'
                      },
                      {
                        title: 'Souls Connected',
                        value: dataLoading ? <Loader size={16} className="animate-spin" /> : formatNumber(totalTokensSold),
                        icon: <Users size={20} />,
                        suffix: ' SOUL',
                        color: 'from-indigo-500 to-blue-500',
                        trend: '+8.7%',
                        description: 'Tokens preserving emotions'
                      },
                      {
                        title: 'Total Participants',
                        value: dataLoading ? <Loader size={16} className="animate-spin" /> : formatNumber(totalParticipants),
                        icon: <Sparkles size={20} />,
                        suffix: '',
                        color: 'from-teal-500 to-cyan-500',
                        trend: '+3.2%',
                        description: 'Beautiful souls joined'
                      }
                    ].map((stat, index) => (
                      <div key={index} className="bg-white/10 backdrop-blur-lg border-white/20 rounded-2xl p-4 sm:p-6 border hover:border-pink-500/50 transition-all duration-300 hover:scale-105 group">
                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                          <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            {stat.icon}
                          </div>
                          <div className={`text-xs px-2 py-1 rounded-full ${stat.trend.startsWith('+') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                            {stat.trend}
                          </div>
                        </div>
                        <div className="text-lg sm:text-2xl font-bold mb-1 text-pink-100">
                          {stat.value}{typeof stat.value === 'string' || typeof stat.value === 'number' ? stat.suffix : ''}
                        </div>
                        <div className="text-xs sm:text-sm text-pink-200 mb-1">{stat.title}</div>
                        {stat.description && (
                          <div className="text-xs text-purple-300 opacity-80">{stat.description}</div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
                    {/* Purchase Section */}
                    <div className="xl:col-span-2 space-y-6">
                      {/* Current Emotional Stage Info */}
                      {stageInfo && (
                        <div className="bg-white/10 backdrop-blur-lg border-white/20 rounded-3xl p-6 sm:p-8 border hover:border-pink-500/30 transition-all duration-300">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                            <div>
                              <h3 className="text-xl sm:text-2xl font-bold text-pink-100 mb-2">
                                {STAGE_CONFIG.find(s => s.stage === currentStage)?.emotion || `Stage ${currentStage}`}
                              </h3>
                              <p className="text-sm text-purple-200">
                                {STAGE_CONFIG.find(s => s.stage === currentStage)?.description || 'Emotional journey continues'}
                              </p>
                            </div>
                            <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-pink-500/30">
                              <span className="text-pink-300 font-bold text-sm sm:text-lg">{stageInfo.bonus}% Bonus</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                            <div className="text-center p-4 bg-white/5 rounded-2xl">
                              <div className="text-xs sm:text-sm text-pink-200 mb-2">Soul Price</div>
                              <div className="text-2xl sm:text-3xl font-bold text-green-400">${priceToUSD(stageInfo.price).toFixed(3)}</div>
                            </div>
                            <div className="text-center p-4 bg-white/5 rounded-2xl">
                              <div className="text-xs sm:text-sm text-pink-200 mb-2">Emotional Progress</div>
                              <div className="text-2xl sm:text-3xl font-bold text-blue-400">{progressPercentage.toFixed(1)}%</div>
                            </div>
                            <div className="text-center p-4 bg-white/5 rounded-2xl">
                              <div className="text-xs sm:text-sm text-pink-200 mb-2">Next Stage Price</div>
                              <div className="text-2xl sm:text-3xl font-bold text-orange-400">
                                ${currentStage < 10 ? STAGE_CONFIG.find(s => s.stage === currentStage + 1)?.price.toFixed(3) : 'N/A'}
                              </div>
                            </div>
                          </div>

                          <div className="mb-6">
                            <div className="flex justify-between text-xs sm:text-sm text-pink-200 mb-3">
                              <span>Souls Preserved: {formatNumber(stageInfo.sold)} SOUL</span>
                              <span>Stage Capacity: {formatNumber(stageInfo.allocation)} SOUL</span>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden shadow-inner">
                              <div
                                className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 transition-all duration-1000 ease-out relative"
                                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                              >
                                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                              </div>
                            </div>
                            <div className="text-center mt-2 text-xs sm:text-sm text-purple-200">
                              {formatNumber(parseFloat(stageInfo.allocation) - parseFloat(stageInfo.sold))} SOUL remaining in this emotional stage
                            </div>
                          </div>

                          {/* Emotional Journey Timeline */}
                          <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-2xl border border-pink-500/20">
                            <h4 className="font-bold mb-4 flex items-center gap-2 text-sm sm:text-base text-pink-100">
                              <Heart size={18} fill="currentColor" />
                              Emotional Journey Timeline
                            </h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-4">
                              {STAGE_CONFIG.slice(0, 5).map((stage, index) => (
                                <div
                                  key={stage.stage}
                                  className={`text-center p-2 sm:p-3 rounded-xl transition-all duration-300 ${
                                    stage.stage === currentStage
                                      ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30'
                                      : stage.stage < currentStage
                                        ? 'bg-green-500/10 border border-green-500/20'
                                        : 'bg-white/5 border border-white/10'
                                  }`}
                                >
                                  <div className="text-xs font-medium mb-1 text-pink-200">{stage.emotion}</div>
                                  <div className="text-xs sm:text-sm font-bold text-white">${stage.price.toFixed(3)}</div>
                                  <div className="text-xs text-purple-300">{stage.bonus}%</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Purchase Form */}
                      <div className="bg-white/10 backdrop-blur-lg border-white/20 rounded-3xl p-6 sm:p-8 border hover:border-pink-500/30 transition-all duration-300">
                        <h3 className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-2 text-pink-100">
                          <Heart size={20} fill="currentColor" className="animate-pulse" />
                          Invest in Your Soul
                        </h3>

                        {/* Wallet Balance Display */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl p-4 border border-yellow-500/20">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-xs text-pink-200 mb-1">BNB Balance</div>
                                <div className="text-lg font-bold text-yellow-400">
                                  {balanceLoading ? (
                                    <Loader className="animate-spin" size={16} />
                                  ) : (
                                    `${parseFloat(bnbBalance).toFixed(4)} BNB`
                                  )}
                                </div>
                              </div>
                              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                                <Coins size={14} className="text-black" />
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl p-4 border border-green-500/20">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-xs text-pink-200 mb-1">USDT Balance</div>
                                <div className="text-lg font-bold text-green-400">
                                  {balanceLoading ? (
                                    <Loader className="animate-spin" size={16} />
                                  ) : (
                                    `${parseFloat(usdtBalance).toFixed(2)} USDT`
                                  )}
                                </div>
                              </div>
                              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                <DollarSign size={14} className="text-black" />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Payment Method Selection */}
                        <div className="flex gap-2 sm:gap-4 mb-6">
                          {['BNB', 'USDT'].map((method) => (
                            <button
                              key={method}
                              onClick={() => setBuyMethod(method as 'BNB' | 'USDT')}
                              className={`flex-1 py-3 sm:py-4 px-4 sm:px-6 rounded-2xl font-semibold transition-all duration-300 text-sm sm:text-base ${
                                buyMethod === method
                                  ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white shadow-lg scale-105'
                                  : 'bg-white/10 backdrop-blur-lg border-white/20 text-pink-200 hover:text-white border hover:border-pink-500/50'
                              }`}
                            >
                              <div className="flex items-center justify-center gap-2">
                                <div className={`w-4 h-4 sm:w-6 sm:h-6 rounded-full ${method === 'BNB' ? 'bg-yellow-400' : 'bg-green-400'}`}></div>
                                Pay with {method}
                              </div>
                            </button>
                          ))}
                        </div>

                        <div className="space-y-6">
                          {/* Quick Amount Selection */}
                          <div>
                            <label className="block text-sm font-medium text-pink-200 mb-3">
                              Quick Amount Selection
                            </label>
                            <div className="grid grid-cols-4 gap-2 mb-4">
                              {(buyMethod === 'BNB' ? BNB_AMOUNTS : USDT_AMOUNTS).map((amount) => (
                                <button
                                  key={amount}
                                  onClick={() => handleQuickAmount(amount)}
                                  className={`py-2 px-3 rounded-xl font-medium transition-all duration-300 text-sm ${
                                    buyAmount === amount.toString()
                                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                                      : 'bg-white/10 backdrop-blur-lg border-white/20 text-pink-200 hover:text-white border hover:border-pink-500/50'
                                  }`}
                                >
                                  {amount} {buyMethod}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-pink-200 mb-3">
                              Investment Amount ({buyMethod})
                            </label>
                            <div className="relative">
                              <input
                                type="number"
                                value={buyAmount}
                                onChange={(e) => setBuyAmount(e.target.value)}
                                placeholder={`Enter ${buyMethod} amount`}
                                className="w-full bg-white/10 border-white/20 text-white placeholder-pink-300 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg font-medium focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 border"
                                style={{
                                  WebkitAppearance: 'none',
                                  MozAppearance: 'textfield'
                                }}
                                onWheel={(e) => e.preventDefault()}
                                onKeyDown={(e) => {
                                  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                                    e.preventDefault();
                                  }
                                }}
                              />
                              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                <span className="text-sm text-pink-300 font-medium">{buyMethod}</span>
                              </div>
                            </div>
                            {buyMethod === 'BNB' && buyAmount && (
                              <div className="mt-2 text-sm text-purple-200">
                                ≈ ${formatNumber(parseFloat(buyAmount) * liveBnbPrice)} USD
                              </div>
                            )}
                          </div>

                          {/* Emotional Investment Calculation */}
                          {buyAmount && (
                            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl p-4 sm:p-6 border border-green-500/20">
                              <h4 className="font-bold mb-4 text-green-400 flex items-center gap-2 text-sm sm:text-base">
                                <Calculator size={18} />
                                Your Emotional Investment
                              </h4>
                              <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                  <span className="text-pink-200">Base SOUL Tokens:</span>
                                  <span className="font-bold text-white">{formatNumber(parseFloat(calculatedTokens) - parseFloat(calculatedBonus))} SOUL</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-pink-200">Emotional Bonus ({stageInfo?.bonus}%):</span>
                                  <span className="font-bold text-green-400">+{formatNumber(calculatedBonus)} SOUL</span>
                                </div>
                                <div className="border-t border-green-500/20 pt-3">
                                  <div className="flex justify-between">
                                    <span className="font-bold text-sm text-pink-100">Total SOUL Tokens:</span>
                                    <span className="font-bold text-lg sm:text-2xl text-green-400">{formatNumber(calculatedTokens)} SOUL</span>
                                  </div>
                                </div>
                                <div className="text-center mt-4 p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
                                  <span className="text-xs sm:text-sm text-purple-300">
                                    💖 You save ${formatNumber((parseFloat(calculatedBonus) * (stageInfo ? priceToUSD(stageInfo.price) : 0)))} with emotional bonus!
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}

                          <div>
                            <label className="block text-sm font-medium text-pink-200 mb-3">
                              Soul Connection (Optional Referral)
                            </label>
                            <input
                              type="text"
                              value={referralCode}
                              onChange={(e) => setReferralCode(e.target.value)}
                              placeholder="Enter soul connection address for 5% bonus"
                              className="w-full bg-white/10 border-white/20 text-white placeholder-pink-300 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 text-sm sm:text-base border"
                            />
                          </div>

                          <button
                            onClick={buyTokens}
                            disabled={!buyAmount || txLoading || parseFloat(buyAmount) <= 0}
                            className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 px-6 py-4 sm:py-6 rounded-2xl font-bold text-base sm:text-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-2xl shadow-pink-500/25 disabled:opacity-50 hover:scale-105 disabled:hover:scale-100"
                          >
                            {txLoading ? (
                              <>
                                <Loader className="animate-spin" size={20} />
                                Processing Your Emotional Investment...
                              </>
                            ) : (
                              <>
                                <Heart size={20} fill="currentColor" className="animate-pulse" />
                                <span className="text-sm sm:text-base">Invest in {formatNumber(calculatedTokens)} SOUL with {buyAmount} {buyMethod}</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Soul Stats Sidebar */}
                    <div className="space-y-6">
                      {userInfo && (
                        <>
                          <div className="bg-white/10 backdrop-blur-lg border-white/20 rounded-2xl p-6 border hover:border-pink-500/30 transition-all duration-300">
                            <h3 className="text-lg sm:text-xl font-bold mb-6 flex items-center gap-2 text-pink-100">
                              <User size={18} />
                              Your Soul Portfolio
                            </h3>
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <span className="text-pink-200 text-sm">Hearts Invested:</span>
                                <span className="font-bold text-lg sm:text-xl text-white">${formatNumber(userInfo.contributions)}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-pink-200 text-sm">SOUL Tokens:</span>
                                <span className="font-bold text-lg sm:text-xl text-blue-400">{formatNumber(userInfo.tokensPurchased)} SOUL</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-pink-200 text-sm">Connection Bonus:</span>
                                <span className="font-bold text-lg sm:text-xl text-green-400">{formatNumber(userInfo.referralBonuses)} SOUL</span>
                              </div>

                              {/* Soul Portfolio Value */}
                              <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
                                <div className="text-center">
                                  <div className="text-xs sm:text-sm text-pink-200 mb-1">Current Soul Value</div>
                                  <div className="text-xl sm:text-2xl font-bold text-blue-400">
                                    ${formatNumber(
                                      (parseFloat(userInfo.tokensPurchased) + parseFloat(userInfo.referralBonuses)) * 
                                      (stageInfo ? priceToUSD(stageInfo.price) : 0)
                                    )}
                                  </div>
                                  {parseFloat(userInfo.contributions) > 0 && (
                                    <div className="text-xs text-green-400 mt-1">
                                      +{formatNumber(
                                        (((parseFloat(userInfo.tokensPurchased) + parseFloat(userInfo.referralBonuses)) * 
                                        (stageInfo ? priceToUSD(stageInfo.price) : 0) - 
                                        parseFloat(userInfo.contributions)) / 
                                        parseFloat(userInfo.contributions)) * 100
                                      )}% Emotional ROI
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Claim Section */}
                          {parseFloat(userInfo.claimable) > 0 && (
                            <div className="bg-white/10 backdrop-blur-lg border-white/20 rounded-2xl p-6 border border-green-500/30 hover:border-green-500/50 transition-all duration-300">
                              <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2 text-green-400">
                                <Gift size={18} />
                                Soul Rewards Available
                              </h3>
                              <div className="text-center mb-6">
                                <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-2">
                                  {formatNumber(userInfo.claimable)} SOUL
                                </div>
                                <div className="text-sm text-pink-200">Ready to claim your emotional rewards</div>
                              </div>
                              <button
                                onClick={claimTokens}
                                disabled={txLoading}
                                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 px-4 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105"
                              >
                                {txLoading ? <Loader className="animate-spin" size={18} /> : <Gift size={18} />}
                                {txLoading ? 'Claiming...' : 'Claim Soul Rewards'}
                              </button>
                            </div>
                          )}

                          {/* Soul Connection Section */}
                          <div className="bg-white/10 backdrop-blur-lg border-white/20 rounded-2xl p-6 border hover:border-pink-500/30 transition-all duration-300">
                            <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2 text-pink-100">
                              <Users size={18} />
                              Soul Connection Program
                            </h3>
                            <div className="mb-4">
                              <div className="text-sm text-pink-200 mb-2">Your Soul Address:</div>
                              <div className="bg-white/10 border-white/20 text-white placeholder-pink-300 rounded-2xl p-3 flex items-center justify-between border">
                                <span className="font-mono text-xs truncate flex-1 mr-2">
                                  {address}
                                </span>
                                <button
                                  onClick={() => copyToClipboard(address!)}
                                  className="text-pink-400 hover:text-pink-300 transition-colors hover:scale-110"
                                >
                                  {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
                                </button>
                              </div>
                            </div>

                            <div className="text-center p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                              <div className="text-xl sm:text-2xl font-bold text-purple-400">5%</div>
                              <div className="text-sm text-pink-200">Soul Connection Bonus</div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'calculator' && (
                <div className="space-y-6 sm:space-y-8">
                  <div className="text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Soul Investment Calculator</h2>
                    <p className="text-pink-200 max-w-2xl mx-auto text-sm sm:text-base">
                      Calculate your potential emotional returns based on different investment amounts and stages.
                      See how much your soul could be worth when SOUL lists at $0.1, $1, or $5. 💖
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                    {/* Calculator Input */}
                    <div className="bg-white/10 backdrop-blur-lg border-white/20 rounded-3xl p-6 sm:p-8 border hover:border-pink-500/30 transition-all duration-300">
                      <h3 className="text-lg sm:text-xl font-bold mb-6 flex items-center gap-2 text-pink-100">
                        <Calculator size={18} />
                        Emotional Investment Calculator
                      </h3>

                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-pink-200 mb-3">
                            Investment Amount (USD)
                          </label>
                          <input
                            type="number"
                            value={roiInvestment}
                            onChange={(e) => setRoiInvestment(e.target.value)}
                            className="w-full bg-white/10 border-white/20 text-white placeholder-pink-300 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg font-medium focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 border"
                            placeholder="Enter investment amount"
                            style={{
                              WebkitAppearance: 'none',
                              MozAppearance: 'textfield'
                            }}
                            onWheel={(e) => e.preventDefault()}
                            onKeyDown={(e) => {
                              if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                                e.preventDefault();
                              }
                            }}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-pink-200 mb-3">
                            Emotional Stage
                          </label>
                          <select
                            value={roiStage}
                            onChange={(e) => setRoiStage(parseInt(e.target.value))}
                            className="w-full bg-white/10 border-white/20 text-white placeholder-pink-300 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg font-medium focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 border"
                          >
                            {STAGE_CONFIG.map((stage) => (
                              <option key={stage.stage} value={stage.stage} className="bg-gray-800">
                                {stage.emotion} - ${stage.price.toFixed(3)} ({stage.bonus}% bonus)
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Results */}
                    {roiResults && (
                      <div className="bg-white/10 backdrop-blur-lg border-white/20 rounded-3xl p-6 sm:p-8 border hover:border-pink-500/30 transition-all duration-300">
                        <h3 className="text-lg sm:text-xl font-bold mb-6 flex items-center gap-2 text-pink-100">
                          <TrendingUp size={18} />
                          Projected Soul Returns
                        </h3>

                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-pink-200 text-sm">Investment:</span>
                            <span className="font-bold text-lg sm:text-xl text-white">${roiResults.investment}</span>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-pink-200 text-sm">Base Tokens:</span>
                            <span className="font-bold text-white">{roiResults.tokensReceived} SOUL</span>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-pink-200 text-sm">Emotional Bonus:</span>
                            <span className="font-bold text-green-400">+{roiResults.bonusTokens} SOUL</span>
                          </div>

                          <div className="border-t border-white/20 pt-4">
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-sm text-pink-100">Total SOUL Tokens:</span>
                              <span className="font-bold text-blue-400 text-lg sm:text-xl">{roiResults.totalTokens} SOUL</span>
                            </div>
                          </div>

                          {/* Multiple Price Projections */}
                          <div className="space-y-4 mt-6">
                            {/* At Listing */}
                            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl p-4 sm:p-6 border border-green-500/20">
                              <div className="text-center">
                                <div className="text-xs sm:text-sm text-pink-200 mb-2">At Listing ($0.1/SOUL)</div>
                                <div className="text-2xl sm:text-3xl font-bold text-green-400 mb-3">${roiResults.valueAtListing}</div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div className="text-center">
                                    <div className="text-lg sm:text-xl font-bold text-green-400">+${roiResults.profitAtListing}</div>
                                    <div className="text-xs text-pink-200">Profit</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="text-lg sm:text-xl font-bold text-blue-400">{roiResults.roiAtListing}%</div>
                                    <div className="text-xs text-pink-200">ROI</div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* At $1 */}
                            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-4 sm:p-6 border border-blue-500/20">
                              <div className="text-center">
                                <div className="text-xs sm:text-sm text-pink-200 mb-2">At $1/SOUL</div>
                                <div className="text-2xl sm:text-3xl font-bold text-blue-400 mb-3">${roiResults.valueAt1Dollar}</div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div className="text-center">
                                    <div className="text-lg sm:text-xl font-bold text-green-400">+${roiResults.profitAt1Dollar}</div>
                                    <div className="text-xs text-pink-200">Profit</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="text-lg sm:text-xl font-bold text-blue-400">{roiResults.roiAt1Dollar}%</div>
                                    <div className="text-xs text-pink-200">ROI</div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* At $5 */}
                            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-4 sm:p-6 border border-purple-500/20">
                              <div className="text-center">
                                <div className="text-xs sm:text-sm text-pink-200 mb-2">At $5/SOUL</div>
                                <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-3">${roiResults.valueAt5Dollar}</div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div className="text-center">
                                    <div className="text-lg sm:text-xl font-bold text-green-400">+${roiResults.profitAt5Dollar}</div>
                                    <div className="text-xs text-pink-200">Profit</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="text-lg sm:text-xl font-bold text-purple-400">{roiResults.roiAt5Dollar}%</div>
                                    <div className="text-xs text-pink-200">ROI</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'history' && (
                <div className="space-y-6 sm:space-y-8">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Emotional Journey History</h2>
                      <p className="text-pink-200 mt-2 text-sm sm:text-base">
                        Complete history of your soul's journey and emotional investments 💖
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => {
                          const data = JSON.stringify(transactions, null, 2);
                          const blob = new Blob([data], { type: 'application/json' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `soulchain-journey-${address?.slice(0, 6)}.json`;
                          a.click();
                        }}
                        className="bg-white/10 backdrop-blur-lg border-white/20 px-4 py-2 rounded-2xl flex items-center gap-2 hover:scale-105 transition-all duration-300 border text-sm hover:border-pink-500/50"
                      >
                        <Download size={14} />
                        Export Journey
                      </button>
                    </div>
                  </div>

                  {/* Filters */}
                  <div className="bg-white/10 backdrop-blur-lg border-white/20 rounded-2xl p-4 sm:p-6 border">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-300" size={18} />
                          <input
                            type="text"
                            placeholder="Search your emotional journey..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/10 border-white/20 text-white placeholder-pink-300 rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 text-sm sm:text-base border"
                          />
                        </div>
                      </div>

                      <div className="flex gap-2 overflow-x-auto">
                        {(['all', 'buy', 'claim', 'referral'] as const).map((filter) => (
                          <button
                            key={filter}
                            onClick={() => setHistoryFilter(filter)}
                            className={`px-3 sm:px-4 py-2 rounded-2xl font-medium capitalize transition-all duration-300 whitespace-nowrap text-sm ${
                              historyFilter === filter
                                ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 text-white'
                                : 'bg-white/10 backdrop-blur-lg border-white/20 hover:border-pink-500/50 border text-pink-200'
                            }`}
                          >
                            {filter}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Transaction List */}
                  <div className="space-y-4">
                    {filteredTransactions.length === 0 ? (
                      <div className="bg-white/10 backdrop-blur-lg border-white/20 rounded-2xl p-8 sm:p-12 border text-center">
                        <Heart size={40} className="text-pink-400 mx-auto mb-4" fill="currentColor" />
                        <h3 className="text-lg sm:text-xl font-bold mb-2 text-pink-100">No Emotional Journey Found</h3>
                        <p className="text-pink-200 text-sm sm:text-base">
                          {transactions.length === 0
                            ? "Your emotional journey hasn't begun yet. Start by investing in your soul! 💖"
                            : "No transactions match your current filters. Try adjusting your search criteria."
                          }
                        </p>
                      </div>
                    ) : (
                      filteredTransactions.map((tx) => (
                        <div
                          key={tx.id}
                          className="bg-white/10 backdrop-blur-lg border-white/20 rounded-2xl p-4 sm:p-6 border hover:border-pink-500/50 transition-all duration-300"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3 sm:gap-4">
                              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center ${
                                tx.type === 'buy' ? 'bg-blue-500/20 text-blue-400' :
                                tx.type === 'claim' ? 'bg-green-500/20 text-green-400' :
                                'bg-purple-500/20 text-purple-400'
                              }`}>
                                {tx.type === 'buy' && <Heart size={18} fill="currentColor" />}
                                {tx.type === 'claim' && <Gift size={18} />}
                                {tx.type === 'referral' && <Users size={18} />}
                              </div>

                              <div>
                                <div className="font-bold capitalize text-base sm:text-lg text-pink-100">
                                  {tx.type === 'buy' ? 'Soul Investment' : tx.type === 'claim' ? 'Soul Claim' : 'Soul Connection'}
                                </div>
                                <div className="text-xs sm:text-sm text-pink-200">
                                  {new Date(tx.timestamp).toLocaleString()}
                                </div>
                              </div>
                            </div>

                            <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                              tx.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                              tx.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {tx.status}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4">
                            <div>
                              <div className="text-xs text-pink-200 mb-1">Amount</div>
                              <div className="font-bold text-sm text-white">{tx.amount} {tx.currency}</div>
                            </div>

                            <div>
                              <div className="text-xs text-pink-200 mb-1">SOUL Received</div>
                              <div className="font-bold text-blue-400 text-sm">{tx.tokensReceived} SOUL</div>
                            </div>

                            {tx.bonus !== '0' && (
                              <div>
                                <div className="text-xs text-pink-200 mb-1">Emotional Bonus</div>
                                <div className="font-bold text-green-400 text-sm">+{tx.bonus} SOUL</div>
                              </div>
                            )}

                            <div>
                              <div className="text-xs text-pink-200 mb-1">Emotional Stage</div>
                              <div className="font-bold text-sm text-white">{STAGE_CONFIG.find(s => s.stage === tx.stage)?.emotion || `Stage ${tx.stage}`}</div>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-2 text-xs sm:text-sm">
                              <span className="text-pink-200">Hash:</span>
                              <span className="font-mono text-white">{formatAddress(tx.hash)}</span>
                              <button
                                onClick={() => copyToClipboard(tx.hash)}
                                className="text-purple-400 hover:text-purple-300 transition-colors"
                              >
                                <Copy size={14} />
                              </button>
                            </div>

                            <a
                              href={`https://bscscan.com/tx/${tx.hash}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-purple-400 hover:text-purple-300 transition-colors text-xs sm:text-sm"
                            >
                              View on BSCScan <ExternalLink size={12} />
                            </a>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'referrals' && (
                <div className="space-y-6 sm:space-y-8">
                  <div className="text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Soul Connection Dashboard</h2>
                    <p className="text-pink-200 max-w-2xl mx-auto text-sm sm:text-base">
                      Earn 5% bonus SOUL tokens for every soul you connect to the emotional revolution.
                      Share your link and grow your soul family! 💖✨
                    </p>
                  </div>

                  {/* Soul Connection Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                    <div className="bg-white/10 backdrop-blur-lg border-white/20 rounded-2xl p-6 border text-center hover:border-pink-500/30 transition-all duration-300">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users size={20} className="text-white" />
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold mb-2 text-white">0</div>
                      <div className="text-xs sm:text-sm text-pink-200">Connected Souls</div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg border-white/20 rounded-2xl p-6 border text-center hover:border-pink-500/30 transition-all duration-300">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Heart size={20} className="text-white" fill="currentColor" />
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold mb-2 text-white">{formatNumber(userInfo?.referralBonuses || '0')}</div>
                      <div className="text-xs sm:text-sm text-pink-200">SOUL Earned</div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg border-white/20 rounded-2xl p-6 border text-center hover:border-pink-500/30 transition-all duration-300">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Activity size={20} className="text-white" />
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold mb-2 text-white">0</div>
                      <div className="text-xs sm:text-sm text-pink-200">Active This Month</div>
                    </div>
                  </div>

                  {/* Soul Connection Link */}
                  <div className="bg-white/10 backdrop-blur-lg border-white/20 rounded-3xl p-6 sm:p-8 border hover:border-pink-500/30 transition-all duration-300">
                    <h3 className="text-lg sm:text-xl font-bold mb-6 flex items-center gap-2 text-pink-100">
                      <Share2 size={18} />
                      Your Soul Connection Link
                    </h3>

                    <div className="mb-6">
                      <div className="bg-white/10 border-white/20 text-white placeholder-pink-300 rounded-2xl p-3 sm:p-4 flex items-center justify-between border">
                        <span className="font-mono text-xs sm:text-sm truncate flex-1 mr-4">
                          {`https://soulchain.love/presale?soul=${address}`}
                        </span>
                        <button
                          onClick={() => copyToClipboard(`https://soulchain.love/presale?soul=${address}`)}
                          className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 px-4 sm:px-6 py-2 rounded-xl flex items-center gap-2 hover:scale-105 transition-all duration-300 text-sm"
                        >
                          {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
                          {copied ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <div className="p-4 sm:p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl border border-green-500/20">
                        <h4 className="font-bold text-green-400 mb-2 text-sm sm:text-base">How Soul Connections Work</h4>
                        <ul className="text-xs sm:text-sm text-pink-200 space-y-2">
                          <li>• Share your soul connection link with friends</li>
                          <li>• They invest in SOUL tokens using your link</li>
                          <li>• You earn 5% bonus SOUL tokens on their investment</li>
                          <li>• Bonus tokens are added to your soul instantly</li>
                        </ul>
                      </div>

                      <div className="p-4 sm:p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20">
                        <h4 className="font-bold text-purple-400 mb-2 text-sm sm:text-base">Emotional Bonus Calculation</h4>
                        <div className="text-xs sm:text-sm text-pink-200 space-y-2">
                          <div>If someone invests $1000:</div>
                          <div>• They get SOUL tokens worth $1000</div>
                          <div>• You get bonus SOUL tokens worth $50</div>
                          <div className="text-green-400 font-bold">• Both souls benefit! 💖✨</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'portfolio' && userInfo && (
                <div className="space-y-6 sm:space-y-8">
                  <div className="text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Soul Portfolio Overview</h2>
                    <p className="text-pink-200 max-w-2xl mx-auto text-sm sm:text-base">
                      Complete overview of your SOUL token holdings, emotional performance, and future projections 💖
                    </p>
                  </div>

                  {/* Portfolio Summary */}
                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
                    <div className="xl:col-span-2">
                      <div className="bg-white/10 backdrop-blur-lg border-white/20 rounded-3xl p-6 sm:p-8 border hover:border-pink-500/30 transition-all duration-300">
                        <h3 className="text-lg sm:text-xl font-bold mb-6 text-pink-100">Soul Portfolio Value</h3>

                        <div className="text-center mb-6 sm:mb-8">
                          <div className="text-3xl sm:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            ${formatNumber(
                              (parseFloat(userInfo.tokensPurchased) + parseFloat(userInfo.referralBonuses)) * 
                              (stageInfo ? priceToUSD(stageInfo.price) : 0)
                            )}
                          </div>
                          <div className="text-base sm:text-lg text-pink-200 mb-4">Current Soul Value</div>

                          <div className="flex items-center justify-center gap-4">
                            <div className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full ${
                              parseFloat(userInfo.contributions) > 0
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-gray-500/20 text-gray-400'
                            }`}>
                              <ArrowUpRight size={14} />
                              <span className="font-bold text-sm">
                                {parseFloat(userInfo.contributions) > 0
                                  ? `+${formatNumber(
                                      (((parseFloat(userInfo.tokensPurchased) + parseFloat(userInfo.referralBonuses)) * 
                                      (stageInfo ? priceToUSD(stageInfo.price) : 0) - 
                                      parseFloat(userInfo.contributions)) / 
                                      parseFloat(userInfo.contributions)) * 100
                                    )}%`
                                  : '0%'
                                }
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                          <div className="text-center">
                            <div className="text-xl sm:text-2xl font-bold text-blue-400">{formatNumber(userInfo.tokensPurchased)}</div>
                            <div className="text-xs sm:text-sm text-pink-200">Purchased Tokens</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xl sm:text-2xl font-bold text-green-400">{formatNumber(userInfo.referralBonuses)}</div>
                            <div className="text-xs sm:text-sm text-pink-200">Connection Bonus</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xl sm:text-2xl font-bold text-white">${formatNumber(userInfo.contributions)}</div>
                            <div className="text-xs sm:text-sm text-pink-200">Total Invested</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xl sm:text-2xl font-bold text-purple-400">{formatNumber(userInfo.claimable)}</div>
                            <div className="text-xs sm:text-sm text-pink-200">Claimable</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Multiple Price Projections */}
                      <div className="bg-white/10 backdrop-blur-lg border-white/20 rounded-2xl p-6 border hover:border-pink-500/30 transition-all duration-300">
                        <h4 className="font-bold mb-4 flex items-center gap-2 text-sm sm:text-base text-pink-100">
                          <TrendingUp size={16} />
                          Soul Price Projections
                        </h4>

                        <div className="space-y-4">
                          {/* At Listing */}
                          <div className="text-center p-3 bg-green-500/10 rounded-xl border border-green-500/20">
                            <div className="text-xs text-pink-200 mb-1">At Listing ($0.1)</div>
                            <div className="text-lg sm:text-2xl font-bold text-green-400 mb-1">
                              ${formatNumber((parseFloat(userInfo.tokensPurchased) + parseFloat(userInfo.referralBonuses)) * LISTING_PRICE)}
                            </div>
                            <div className="text-xs font-bold text-green-400">
                              +${formatNumber((parseFloat(userInfo.tokensPurchased) + parseFloat(userInfo.referralBonuses)) * LISTING_PRICE - parseFloat(userInfo.contributions))}
                            </div>
                          </div>

                          {/* At $1 */}
                          <div className="text-center p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                            <div className="text-xs text-pink-200 mb-1">At $1/SOUL</div>
                            <div className="text-lg sm:text-2xl font-bold text-blue-400 mb-1">
                              ${formatNumber((parseFloat(userInfo.tokensPurchased) + parseFloat(userInfo.referralBonuses)) * 1.0)}
                            </div>
                            <div className="text-xs font-bold text-green-400">
                              +${formatNumber((parseFloat(userInfo.tokensPurchased) + parseFloat(userInfo.referralBonuses)) * 1.0 - parseFloat(userInfo.contributions))}
                            </div>
                          </div>

                          {/* At $5 */}
                          <div className="text-center p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
                            <div className="text-xs text-pink-200 mb-1">At $5/SOUL</div>
                            <div className="text-lg sm:text-2xl font-bold text-purple-400 mb-1">
                              ${formatNumber((parseFloat(userInfo.tokensPurchased) + parseFloat(userInfo.referralBonuses)) * 5.0)}
                            </div>
                            <div className="text-xs font-bold text-green-400">
                              +${formatNumber((parseFloat(userInfo.tokensPurchased) + parseFloat(userInfo.referralBonuses)) * 5.0 - parseFloat(userInfo.contributions))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Performance Metrics */}
                      <div className="bg-white/10 backdrop-blur-lg border-white/20 rounded-2xl p-6 border hover:border-pink-500/30 transition-all duration-300">
                        <h4 className="font-bold mb-4 text-sm sm:text-base text-pink-100">Soul Performance</h4>
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <span className="text-pink-200 text-sm">Average Soul Price:</span>
                            <span className="font-bold text-sm text-white">
                              ${parseFloat(userInfo.tokensPurchased) > 0
                                ? (parseFloat(userInfo.contributions) / parseFloat(userInfo.tokensPurchased)).toFixed(3)
                                : '0.000'
                              }
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-pink-200 text-sm">Current Price:</span>
                            <span className="font-bold text-sm text-white">${stageInfo ? priceToUSD(stageInfo.price).toFixed(3) : '0.000'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-pink-200 text-sm">Price Difference:</span>
                            <span className={`font-bold text-sm ${
                              (stageInfo ? priceToUSD(stageInfo.price) : 0) > (parseFloat(userInfo.contributions) / parseFloat(userInfo.tokensPurchased) || 0)
                                ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {parseFloat(userInfo.tokensPurchased) > 0
                                ? `${(((stageInfo ? priceToUSD(stageInfo.price) : 0) / (parseFloat(userInfo.contributions) / parseFloat(userInfo.tokensPurchased))) * 100 - 100).toFixed(1)}%`
                                : '0%'
                              }
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'emotions' && (
                <div className="space-y-6 sm:space-y-8">
                  <div className="text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Emotion Archive</h2>
                    <p className="text-pink-200 max-w-2xl mx-auto text-sm sm:text-base">
                      Explore the collective emotional archive of humanity. Every feeling preserved forever on the blockchain. 💖✨
                    </p>
                  </div>

                  {/* Current Emotion Display */}
                  <div className="bg-white/10 backdrop-blur-lg border-white/20 rounded-3xl p-6 sm:p-8 border hover:border-pink-500/30 transition-all duration-300">
                    <div className="text-center">
                      <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 rounded-full flex items-center justify-center"
                           style={{ backgroundColor: `${currentEmotion.color}20`, border: `2px solid ${currentEmotion.color}` }}>
                        
                        <Heart size={32} className="animate-pulse" style={{ color: currentEmotion.color }} fill="currentColor" />
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: currentEmotion.color }}>
                        {currentEmotion.emotion}
                      </h3>

                      <p className="text-pink-200 mb-4 text-sm sm:text-base">{currentEmotion.description}</p>

                      <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white">{currentEmotion.intensity}%</div>
                          <div className="text-xs text-pink-200">Intensity</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white capitalize">{currentEmotion.category}</div>
                          <div className="text-xs text-pink-200">Category</div>
                        </div>
                      </div>

                      <div className="w-full bg-white/10 rounded-full h-3 mb-4">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: `${currentEmotion.intensity}%`,
                            backgroundColor: currentEmotion.color
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Emotional Moments Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {EMOTIONAL_MOMENTS.map((moment) => (
                      <div
                        key={moment.id}
                        className="bg-white/10 backdrop-blur-lg border-white/20 rounded-2xl p-4 sm:p-6 border hover:border-pink-500/30 transition-all duration-300 hover:scale-105 cursor-pointer"
                        onClick={() => setCurrentEmotion(moment)}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: `${moment.color}20`, border: `1px solid ${moment.color}` }}
                          >
                            <Heart size={14} style={{ color: moment.color }} fill="currentColor" />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-white">{moment.emotion}</h4>
                            <div className="text-xs text-pink-200 capitalize">{moment.category}</div>
                          </div>
                        </div>

                        <p className="text-xs text-pink-200 mb-3 leading-relaxed">{moment.description}</p>

                        <div className="flex items-center justify-between">
                          <div className="text-xs text-pink-200">
                            {new Date(moment.timestamp).toLocaleDateString()}
                          </div>
                          <div className="text-xs font-bold" style={{ color: moment.color }}>
                            {moment.intensity}%
                          </div>
                        </div>

                        <div className="w-full bg-white/10 rounded-full h-1 mt-2">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${moment.intensity}%`,
                              backgroundColor: moment.color
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Your Emotion */}
                  <div className="bg-white/10 backdrop-blur-lg border-white/20 rounded-3xl p-6 sm:p-8 border hover:border-pink-500/30 transition-all duration-300">
                    <h3 className="text-lg sm:text-xl font-bold mb-6 flex items-center gap-2 text-pink-100">
                      <Plus size={18} />
                      Add Your Emotion to the Archive
                    </h3>

                    <div className="text-center p-8 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-2xl border border-pink-500/20">
                      <Heart size={48} className="text-pink-400 mx-auto mb-4 animate-pulse" fill="currentColor" />
                      <h4 className="text-xl font-bold mb-2 text-pink-100">Coming Soon</h4>
                      <p className="text-pink-200 text-sm">
                        Soon you'll be able to permanently store your deepest emotions on the blockchain,
                        creating an eternal archive of human feelings for future generations to discover and connect with.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
    </section>
  );
}

export default PresaleSection;
