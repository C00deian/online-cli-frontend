import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import axios from 'axios';

const TerminalClient = () => {
  const terminalRef = useRef(null);
  const term = useRef(null);
  const fitAddon = useRef(null);
  const isRunning = useRef(false);
  const commandHistory = useRef([]);
  const historyIndex = useRef(-1);

  // Replace with your EC2 instance ID or make dynamic
  const instanceId = 'i-018b085fe840932b1';

  useEffect(() => {
    // Initialize xterm
    term.current = new Terminal({
      cursorBlink: true,
      fontFamily: 'monospace',
      fontSize: 14,
      theme: {
        background: '#000000',
        foreground: '#00ff00',
      },
    });

    // Initialize FitAddon
    fitAddon.current = new FitAddon();
    term.current.loadAddon(fitAddon.current);
    term.current.open(terminalRef.current);
    fitAddon.current.fit();

    // Handle window resize
    const handleResize = () => {
      fitAddon.current.fit();
      scrollToBottom();
    };
    window.addEventListener('resize', handleResize);

    // Prompt function
    const prompt = () => {
      term.current.write('\r\n$ ');
      scrollToBottom();
    };

    // Scroll to bottom
    const scrollToBottom = () => {
      term.current.scrollToBottom();
    };

    // Initial message
    term.current.writeln('Welcome to EC2 via SSM (React Terminal)');
    prompt();

    let currentCommand = '';

    // Handle terminal input
    term.current.onData(data => {
      if (isRunning.current) return;

      if (data === '\r') { // Enter key
        term.current.writeln('');
        if (currentCommand.trim()) {
          commandHistory.current.push(currentCommand);
          historyIndex.current = commandHistory.current.length;
        }
        handleCommand(currentCommand.trim());
        currentCommand = '';
      } else if (data === '\u007F') { // Backspace
        if (currentCommand.length > 0) {
          currentCommand = currentCommand.slice(0, -1);
          term.current.write('\b \b');
        }
      } else if (data === '\u001B[A') { // Up arrow
        if (historyIndex.current > 0) {
          historyIndex.current--;
          currentCommand = commandHistory.current[historyIndex.current] || '';
          clearCurrentLine();
          term.current.write(currentCommand);
        }
      } else if (data === '\u001B[B') { // Down arrow
        if (historyIndex.current < commandHistory.current.length - 1) {
          historyIndex.current++;
          currentCommand = commandHistory.current[historyIndex.current] || '';
        } else {
          historyIndex.current = commandHistory.current.length;
          currentCommand = '';
        }
        clearCurrentLine();
        term.current.write(currentCommand);
      } else {
        currentCommand += data;
        term.current.write(data);
      }
    });

    // Clear current line for history navigation
    const clearCurrentLine = () => {
      term.current.write('\r$ ' + ' '.repeat(currentCommand.length) + '\r$ ');
    };

    // Handle commands via API
    const handleCommand = async (cmd) => {
      if (!cmd) {
        prompt();
        return;
      }

      isRunning.current = true;
      try {
        const { data } = await axios.post('http://localhost:3000/instances/send-command', {
          instanceId,
          command: cmd,
        });

        if (!data.output) {
          term.current.writeln(`bash: ${cmd.split(' ')[0]}: command not found`);
        } else {
          // Stream output
          const lines = data.output.split('\n');
          for (const line of lines) {
            term.current.writeln(line);
            await new Promise(resolve => setTimeout(resolve, 20)); // Simulate streaming
          }
        }
      } catch (err) {
        term.current.writeln(`Error: ${err.message}`);
      }
      isRunning.current = false;
      prompt();
    };

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      term.current.dispose();
    };
  }, []);

  return (
    <div className="">
      <div ref={terminalRef} className="w-full h-full bg-black  overflow-hidden" />
    </div>
  );
};

export default TerminalClient;